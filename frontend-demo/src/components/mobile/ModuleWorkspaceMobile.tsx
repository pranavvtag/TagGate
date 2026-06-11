"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Download, Edit2, Plus, Trash2 } from "lucide-react";
import { primaryLabel, requiredFields, rowsForModule, type Row } from "@/lib/module-data";
import { modules, type ModuleKey } from "@/lib/rbac";
import { Badge, Button, EmptyState, Field, Modal, Pagination, SelectInput, TextInput, Toast } from "@/components/shared/ui";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

function makeBlank(moduleKey: ModuleKey, sample: Row | undefined): Row {
  const row: Row = { id: `${moduleKey}-${Date.now()}` };
  Object.keys(sample ?? {}).forEach((key) => {
    if (key !== "id") row[key] = "";
  });
  return row;
}

export function ModuleWorkspaceMobile({ moduleKey }: { moduleKey: ModuleKey }) {
  const module = modules[moduleKey];
  const [rows, setRows] = useState<Row[]>(() => rowsForModule(moduleKey));
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(() => Object.keys(rows[0] ?? { name: "" }).filter((key) => key !== "id")[0] ?? "name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Row | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");
  const columns = Object.keys(rows[0] ?? { id: "id" }).filter((column) => column !== "id");

  const filtered = useMemo(() => {
    const result = rows.filter((row) => Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase()));
    return [...result].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [query, rows, sortDir, sortKey]);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function save() {
    if (!editing) return;
    const nextErrors: Record<string, string> = {};
    (requiredFields[moduleKey] ?? []).forEach((key) => {
      if (!String(editing[key] ?? "").trim()) nextErrors[key] = "Required";
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setRows((items) => (items.some((item) => item.id === editing.id) ? items.map((item) => (item.id === editing.id ? editing : item)) : [editing, ...items]));
    setEditing(null);
    setToast("Record saved locally");
  }

  return (
    <MobileScreen title={module.label}>
      <section className={styles.softCard}>
        <p className="text-sm text-[#6b7280]">{module.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Badge tone="info">{rows.length} records</Badge>
          <Badge tone="success">{module.workflows.length} workflows</Badge>
        </div>
      </section>

      <section className={`${styles.softCard} mt-4`}>
        <div className="grid gap-3">
          <TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" />
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <SelectInput value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
              {columns.map((column) => <option key={column} value={column}>Sort by {column}</option>)}
            </SelectInput>
            <Button variant="secondary" onClick={() => setSortDir((value) => (value === "asc" ? "desc" : "asc"))}><ArrowDownUp className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => setToast(`${module.label} export simulated`)}><Download className="h-4 w-4" />Export</Button>
            <Button onClick={() => setEditing(makeBlank(moduleKey, rows[0]))}><Plus className="h-4 w-4" />Add</Button>
          </div>
        </div>
      </section>

      <section className="mt-4">
        {pageRows.length === 0 ? <EmptyState title="No records found" detail="Try another filter or add a record." /> : (
          <div className={styles.list}>
            {pageRows.map((row) => (
              <article key={String(row.id)} className={styles.softCard}>
                <p className="font-black">{primaryLabel(row)}</p>
                <div className="mt-3 grid gap-2 text-sm text-[#6b7280]">
                  {columns.slice(0, 4).map((column) => (
                    <p key={column}><span className="font-bold text-[#475569]">{column}: </span>{String(row[column] ?? "")}</p>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="secondary" onClick={() => setEditing(row)}><Edit2 className="h-4 w-4" />Edit</Button>
                  <Button variant="danger" onClick={() => { setRows((items) => items.filter((item) => item.id !== row.id)); setToast("Record deleted locally"); }}><Trash2 className="h-4 w-4" />Delete</Button>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-4"><Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} /></div>
      </section>

      <section className={`${styles.softCard} mt-5`}>
        <h2 className="text-lg font-black">Workflow Simulation</h2>
        <div className="mt-3 grid gap-2">
          {module.workflows.map((workflow) => (
            <button key={workflow} className="rounded-lg border border-[#e5e7eb] p-3 text-left text-sm font-bold" onClick={() => setToast(`${workflow} simulated`)}>
              {workflow}
            </button>
          ))}
        </div>
      </section>

      <Modal title={`${editing?.id && rows.some((row) => row.id === editing.id) ? "Edit" : "Add"} ${module.label}`} open={Boolean(editing)} onClose={() => setEditing(null)}>
        {editing ? (
          <div className="grid gap-4">
            {Object.keys(editing).filter((key) => key !== "id").map((key) => (
              <Field key={key} label={key} error={errors[key]}>
                <TextInput value={String(editing[key] ?? "")} onChange={(event) => setEditing({ ...editing, [key]: event.target.value })} />
              </Field>
            ))}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>
        ) : null}
      </Modal>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </MobileScreen>
  );
}
