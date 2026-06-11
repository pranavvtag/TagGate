"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Download, Edit2, Plus, Trash2 } from "lucide-react";
import { rowsForModule, primaryLabel, requiredFields, type Row } from "@/lib/module-data";
import { modules, type ModuleKey } from "@/lib/rbac";
import { Badge, Button, Card, EmptyState, Field, Modal, Pagination, SelectInput, TextInput, Toast } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

function makeBlank(moduleKey: ModuleKey, sample: Row | undefined): Row {
  const row: Row = { id: `${moduleKey}-${Date.now()}` };
  Object.keys(sample ?? {}).forEach((key) => {
    if (key !== "id") {
      row[key] = "";
    }
  });
  return row;
}

function tone(value: string | number | undefined) {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("high") || text.includes("inactive") || text.includes("blocked")) return "danger" as const;
  if (text.includes("pending") || text.includes("open") || text.includes("medium") || text.includes("review")) return "warning" as const;
  if (text.includes("active") || text.includes("approved") || text.includes("ready") || text.includes("completed")) return "success" as const;
  return "info" as const;
}

export function ModuleWorkspaceDesktop({ moduleKey }: { moduleKey: ModuleKey }) {
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

  const pageSize = 8;
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
    <DesktopShell
      title={module.label}
      subtitle={module.description}
      actions={
        <>
          <Button variant="secondary" onClick={() => setToast(`${module.label} export simulated`)}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setEditing(makeBlank(moduleKey, rows[0]))}>
            <Plus className="h-4 w-4" /> Add
          </Button>
        </>
      }
    >
      <div className={styles.grid}>
        <section className={styles.statsGrid}>
          <Card className="p-5"><p className="text-sm font-semibold text-[#6b7280]">Records</p><p className="mt-2 text-3xl font-black">{rows.length}</p></Card>
          <Card className="p-5"><p className="text-sm font-semibold text-[#6b7280]">Filtered</p><p className="mt-2 text-3xl font-black">{filtered.length}</p></Card>
          <Card className="p-5"><p className="text-sm font-semibold text-[#6b7280]">Workflows</p><p className="mt-2 text-3xl font-black">{module.workflows.length}</p></Card>
          <Card className="p-5"><p className="text-sm font-semibold text-[#6b7280]">Mode</p><p className="mt-2 text-3xl font-black">Mock</p></Card>
        </section>

        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className={styles.cardTitle}>{module.label} Records</h2>
              <p className="mt-1 text-sm text-[#6b7280]">{module.workflows.join(" · ")}</p>
            </div>
            <div className="flex gap-2">
              <TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" />
              <SelectInput value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
                {columns.map((column) => <option key={column} value={column}>Sort by {column}</option>)}
              </SelectInput>
              <Button variant="secondary" onClick={() => setSortDir((value) => (value === "asc" ? "desc" : "asc"))}><ArrowDownUp className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="mt-5">
            {pageRows.length === 0 ? <EmptyState title="No records found" detail="Change filters or add a record." /> : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}<th>Actions</th></tr></thead>
                  <tbody>
                    {pageRows.map((row) => (
                      <tr key={String(row.id)}>
                        {columns.map((column) => <td key={column}>{String(row[column] ?? "")}</td>)}
                        <td>
                          <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => setEditing(row)}><Edit2 className="h-4 w-4" /></Button>
                            <Button variant="danger" onClick={() => { setRows((items) => items.filter((item) => item.id !== row.id)); setToast("Record deleted locally"); }}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="mt-5"><Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} /></div>
        </Card>

        <Card className="p-5">
          <h2 className={styles.cardTitle}>Workflow Simulation</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {module.workflows.map((workflow) => (
              <button key={workflow} onClick={() => setToast(`${workflow} simulated`)} className="rounded-lg border border-[#e5e7eb] p-4 text-left font-bold hover:border-[#0f7780]">
                {workflow}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Modal title={`${editing?.id && rows.some((row) => row.id === editing.id) ? "Edit" : "Add"} ${module.label}`} open={Boolean(editing)} onClose={() => setEditing(null)}>
        {editing ? (
          <div className={styles.formGrid}>
            {Object.keys(editing).filter((key) => key !== "id").map((key) => (
              <Field key={key} label={key} error={errors[key]}>
                <TextInput value={String(editing[key] ?? "")} onChange={(event) => setEditing({ ...editing, [key]: event.target.value })} />
              </Field>
            ))}
            <div className="col-span-2 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}>Save Record</Button>
            </div>
          </div>
        ) : null}
      </Modal>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </DesktopShell>
  );
}
