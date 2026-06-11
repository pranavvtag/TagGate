"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Bot, Download, Edit2, Plus, Trash2 } from "lucide-react";
import { data } from "@/lib/data";
import { Badge, Button, EmptyState, Field, Modal, Pagination, SelectInput, TextInput, Toast } from "@/components/shared/ui";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

type Row = Record<string, string | number>;
type SectionKey = "residents" | "properties" | "tenants" | "visitors" | "complaints" | "services" | "groceryOrders" | "utilities" | "nriReports";

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

const sourceData = data as unknown as Record<SectionKey, Row[]>;

function makeBlankRow(section: SectionKey, sample: Row | undefined): Row {
  const row: Row = { id: `${section}-${Date.now()}` };
  Object.keys(sample ?? {}).forEach((key) => {
    if (key !== "id") {
      row[key] = "";
    }
  });
  return row;
}

function toneForValue(value: string | number | undefined) {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("high") || text.includes("inactive") || text.includes("booked")) {
    return "danger" as const;
  }
  if (text.includes("pending") || text.includes("open") || text.includes("medium")) {
    return "warning" as const;
  }
  if (text.includes("active") || text.includes("approved") || text.includes("resolved") || text.includes("available")) {
    return "success" as const;
  }
  return "info" as const;
}

export function ManagementMobile() {
  const initial = useMemo(
    () =>
      sections.reduce<Record<SectionKey, Row[]>>((acc, section) => {
        acc[section.key] = [...(sourceData[section.key] ?? [])];
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

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function selectSection(nextSection: SectionKey) {
    const nextRows = rowsBySection[nextSection];
    setSection(nextSection);
    setQuery("");
    setPage(1);
    setSortKey(Object.keys(nextRows[0] ?? { name: "" }).filter((key) => key !== "id")[0] ?? "name");
  }

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
    <MobileScreen title="Management">
      <section className="grid grid-cols-2 gap-3">
        {sections.map((item) => (
          <button
            key={item.key}
            onClick={() => selectSection(item.key)}
            className={`${styles.softCard} text-left ${item.key === section ? "border-[#0f7780] bg-[#effafa]" : ""}`}
          >
            <p className="text-2xl font-black text-[#0f7780]">{rowsBySection[item.key].length}</p>
            <p className="mt-1 text-sm font-bold text-[#202737]">{item.label}</p>
          </button>
        ))}
      </section>

      <section className={`${styles.softCard} mt-6`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">{currentSection.label}</h2>
            <p className="mt-1 text-sm text-[#6b7280]">{currentSection.description}</p>
          </div>
          <Badge tone="info">{filtered.length}</Badge>
        </div>

        <div className="mt-4 grid gap-3">
          <TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter records" aria-label="Filter records" />
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <SelectInput value={sortKey} onChange={(event) => setSortKey(event.target.value)} aria-label="Sort records">
              {columns.map((column) => (
                <option key={column} value={column}>
                  Sort by {column}
                </option>
              ))}
            </SelectInput>
            <Button variant="secondary" onClick={() => setSortDir((value) => (value === "asc" ? "desc" : "asc"))} aria-label="Toggle sort direction">
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={exportRows}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-5">
        {pageRows.length === 0 ? (
          <EmptyState title="No records found" detail="Try another filter or add a new record." />
        ) : (
          <div className={styles.list}>
            {pageRows.map((row) => {
              const title = String(row.name ?? row.number ?? row.category ?? row.property ?? row.id);
              const status = row.status ?? row.approval ?? row.occupancy ?? row.alert ?? "";
              return (
                <article key={String(row.id)} className={styles.softCard}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-black">{title}</p>
                      <div className="mt-3 grid gap-2 text-sm text-[#6b7280]">
                        {columns.slice(0, 4).map((column) => (
                          <p key={column} className="break-words">
                            <span className="font-bold text-[#475569]">{column}: </span>
                            {String(row[column] ?? "")}
                          </p>
                        ))}
                      </div>
                    </div>
                    {status ? <Badge tone={toneForValue(status)}>{String(status)}</Badge> : null}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={() => setEditing(row)}>
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteRow(row.id)}>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        <div className="mt-4">
          <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </section>

      <section className={`${styles.softCard} mt-6`}>
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-[#0f7780]" />
          <h2 className="text-lg font-black">Assistant Simulation</h2>
        </div>
        <div className="mt-4 grid gap-2">
          {data.assistantSuggestions.map((suggestion) => (
            <button key={suggestion} className="rounded-lg border border-[#e5e7eb] p-3 text-left text-sm font-semibold">
              {suggestion}
            </button>
          ))}
        </div>
      </section>

      <Modal title={`${editing?.id && rows.some((row) => row.id === editing.id) ? "Edit" : "Add"} ${currentSection.label}`} open={Boolean(editing)} onClose={() => setEditing(null)}>
        {editing ? (
          <div className="grid gap-4">
            {Object.keys(editing)
              .filter((key) => key !== "id")
              .map((key) => (
                <Field key={key} label={key} error={errors[key]}>
                  <TextInput value={String(editing[key] ?? "")} onChange={(event) => setEditing({ ...editing, [key]: event.target.value })} />
                </Field>
              ))}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={saveRow}>Save</Button>
            </div>
          </div>
        ) : null}
      </Modal>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </MobileScreen>
  );
}
