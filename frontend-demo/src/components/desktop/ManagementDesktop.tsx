"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Bot, Download, Edit2, Plus, Search, Trash2 } from "lucide-react";
import { data } from "@/lib/data";
import { Button, Card, EmptyState, Field, Modal, Pagination, SelectInput, TextInput, Toast } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

type Row = Record<string, string | number>;
type SectionKey = "residents" | "properties" | "tenants" | "visitors" | "complaints" | "services" | "utilities" | "nriReports" | "groceryOrders";

const sections: { key: SectionKey; label: string; description: string }[] = [
  { key: "residents", label: "Residents", description: "Profiles, activation, and property association" },
  { key: "properties", label: "Properties", description: "Property numbers, owners, occupancy, dues" },
  { key: "tenants", label: "Tenants", description: "Onboarding, documents, move-in and approvals" },
  { key: "visitors", label: "Visitors", description: "Gate logs, purpose, status, and verification" },
  { key: "complaints", label: "Complaints", description: "Ticket assignment, priority, and history" },
  { key: "services", label: "Services", description: "Marketplace bookings and provider status" },
  { key: "groceryOrders", label: "Groceries", description: "Cart and order history preview" },
  { key: "utilities", label: "Utilities", description: "Electricity, water, maintenance reminders" },
  { key: "nriReports", label: "NRI Reports", description: "Occupancy, inspections, and maintenance updates" }
];

const requiredBySection: Record<SectionKey, string[]> = {
  residents: ["name", "property", "phone"],
  properties: ["number", "owner", "occupancy"],
  tenants: ["name", "property", "documents"],
  visitors: ["name", "purpose", "property"],
  complaints: ["category", "description", "priority"],
  services: ["category", "provider", "status"],
  groceryOrders: ["items", "amount", "status"],
  utilities: ["name", "monthly", "alert"],
  nriReports: ["property", "occupancy", "inspection"]
};

function toRows(value: unknown): Row[] {
  return Array.isArray(value) ? (value as Row[]) : [];
}

function makeBlankRow(section: SectionKey, sample: Row | undefined): Row {
  const row: Row = { id: `${section}-${Date.now()}` };
  Object.keys(sample ?? {}).forEach((key) => {
    if (key !== "id") {
      row[key] = "";
    }
  });
  return row;
}

export function ManagementDesktop() {
  const initial = useMemo(
    () =>
      sections.reduce<Record<SectionKey, Row[]>>((acc, section) => {
        acc[section.key] = toRows(data[section.key]);
        return acc;
      }, {} as Record<SectionKey, Row[]>),
    []
  );
  const [rowsBySection, setRowsBySection] = useState(initial);
  const [section, setSection] = useState<SectionKey>("residents");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Row | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");

  const rows = rowsBySection[section];
  const currentSection = sections.find((item) => item.key === section) ?? sections[0];
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

  function openCreate() {
    setEditing(makeBlankRow(section, rows[0]));
    setErrors({});
  }

  function saveRow() {
    if (!editing) {
      return;
    }

    const nextErrors: Record<string, string> = {};
    requiredBySection[section].forEach((key) => {
      if (!String(editing[key] ?? "").trim()) {
        nextErrors[key] = "Required";
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    setRowsBySection((prev) => {
      const exists = prev[section].some((row) => row.id === editing.id);
      return {
        ...prev,
        [section]: exists ? prev[section].map((row) => (row.id === editing.id ? editing : row)) : [editing, ...prev[section]]
      };
    });
    setEditing(null);
    setToast("Record saved locally");
  }

  function deleteRow(id: string | number) {
    setRowsBySection((prev) => ({ ...prev, [section]: prev[section].filter((row) => row.id !== id) }));
    setToast("Record deleted locally");
  }

  function exportRows() {
    setToast(`${currentSection.label} export simulated`);
  }

  return (
    <DesktopShell
      title="Management Workspace"
      subtitle="Local prototype for admin, resident, owner, tenant, security, service, and NRI workflows."
      actions={
        <>
          <Button variant="secondary" onClick={exportRows}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add Record
          </Button>
        </>
      }
    >
      <div className={styles.managementLayout}>
        <Card className="p-3">
          <div className={styles.tabRail}>
            {sections.map((item) => (
              <button
                key={item.key}
                className={`rounded-lg px-3 py-3 text-left text-sm font-bold transition ${item.key === section ? "bg-[#0f7780] text-white" : "text-[#475569] hover:bg-[#f8fafc]"}`}
                onClick={() => {
                  setSection(item.key);
                  setQuery("");
                  setPage(1);
                  setSortKey("name");
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Card>

        <div className={styles.grid}>
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={styles.cardTitle}>{currentSection.label}</h2>
                <p className="mt-1 text-sm text-[#6b7280]">{currentSection.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
                  <TextInput className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter records" />
                </div>
                <SelectInput value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
                  {columns.map((column) => (
                    <option key={column} value={column}>
                      Sort by {column}
                    </option>
                  ))}
                </SelectInput>
                <Button variant="secondary" onClick={() => setSortDir((value) => (value === "asc" ? "desc" : "asc"))}>
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-5">
              {pageRows.length === 0 ? (
                <EmptyState title="No records found" detail="Try changing filters or add a new record." />
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((row) => (
                        <tr key={String(row.id)}>
                          {columns.map((column) => (
                            <td key={column}>{String(row[column] ?? "")}</td>
                          ))}
                          <td>
                            <div className="flex gap-2">
                              <Button variant="secondary" onClick={() => setEditing(row)} aria-label="Edit record">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="danger" onClick={() => deleteRow(row.id)} aria-label="Delete record">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="mt-5">
              <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#dff7f3] text-[#0f7780]">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <h2 className={styles.cardTitle}>Conversational Assistant Simulation</h2>
                <p className="text-sm text-[#6b7280]">Try requests like complaints, service bookings, grocery orders, utility checks, or maintenance dues.</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {data.assistantSuggestions.map((suggestion) => (
                <button key={suggestion} className="rounded-lg border border-[#e5e7eb] p-3 text-left text-sm font-semibold hover:border-[#0f7780]">
                  {suggestion}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal title={`${editing?.id && rows.some((row) => row.id === editing.id) ? "Edit" : "Add"} ${currentSection.label} Record`} open={Boolean(editing)} onClose={() => setEditing(null)}>
        {editing ? (
          <div className={styles.formGrid}>
            {Object.keys(editing)
              .filter((key) => key !== "id")
              .map((key) => (
                <Field key={key} label={key} error={errors[key]}>
                  <TextInput value={String(editing[key] ?? "")} onChange={(event) => setEditing({ ...editing, [key]: event.target.value })} />
                </Field>
              ))}
            <div className="col-span-2 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={saveRow}>Save Record</Button>
            </div>
          </div>
        ) : null}
      </Modal>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </DesktopShell>
  );
}
