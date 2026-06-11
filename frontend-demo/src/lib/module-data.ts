import { complaints, data, groceryOrders, nriReports, products, properties, residents, securityIncidents, services, tenants, utilityUsage, vendors, visitors } from "@/lib/data";
import type { ModuleKey } from "@/lib/rbac";

export type Row = Record<string, string | number>;

export const moduleRows: Partial<Record<ModuleKey, Row[]>> = {
  residents,
  properties,
  tenants,
  complaints,
  visitors,
  security: securityIncidents,
  notices: data.notifications as Row[],
  vendors,
  services,
  groceries: products,
  utilities: utilityUsage,
  nri: nriReports,
  reports: [
    { id: "rep-001", name: "Residents Report", records: residents.length, status: "Ready", exportType: "CSV" },
    { id: "rep-002", name: "Properties Report", records: properties.length, status: "Ready", exportType: "XLSX" },
    { id: "rep-003", name: "Tenants Report", records: tenants.length, status: "Ready", exportType: "CSV" },
    { id: "rep-004", name: "Complaints Report", records: complaints.length, status: "Ready", exportType: "PDF" },
    { id: "rep-005", name: "Visitors Report", records: visitors.length, status: "Ready", exportType: "CSV" },
    { id: "rep-006", name: "Services Report", records: services.length, status: "Ready", exportType: "CSV" },
    { id: "rep-007", name: "Utilities Report", records: utilityUsage.length, status: "Ready", exportType: "PDF" }
  ],
  bookings: services.filter((service) => service.status !== "Available"),
  ratings: services.map((service) => ({ id: service.id, provider: service.provider, category: service.category, rating: service.rating, feedback: "Resident feedback reviewed" })),
  assistant: [
    { id: "chat-001", request: "Water leakage in kitchen", action: "Create Complaint", result: "Generated Plumbing ticket" },
    { id: "chat-002", request: "Book electrician tomorrow", action: "Create Service Request", result: "Electrician request scheduled" },
    { id: "chat-003", request: "Show electricity usage", action: "Show Usage Widget", result: "Weekly usage displayed" },
    { id: "chat-004", request: "How much maintenance is pending?", action: "Show Dues", result: "Rs 12,500 pending" }
  ]
};

export const requiredFields: Partial<Record<ModuleKey, string[]>> = {
  residents: ["name", "property", "phone"],
  properties: ["number", "owner", "occupancy"],
  tenants: ["name", "property", "documents"],
  complaints: ["category", "description", "priority"],
  visitors: ["name", "purpose", "property"],
  security: ["title", "location", "severity"],
  notices: ["title", "type", "priority"],
  vendors: ["name", "category", "contact"],
  services: ["category", "provider", "status"],
  groceries: ["name", "category", "price"],
  utilities: ["name", "monthly", "alert"],
  nri: ["property", "occupancy", "inspection"],
  reports: ["name", "records", "exportType"],
  bookings: ["category", "provider", "status"],
  ratings: ["provider", "rating", "feedback"],
  assistant: ["request", "action", "result"]
};

export function rowsForModule(moduleKey: ModuleKey) {
  return [...(moduleRows[moduleKey] ?? [])];
}

export function primaryLabel(row: Row) {
  return String(row.name ?? row.title ?? row.number ?? row.category ?? row.property ?? row.provider ?? row.request ?? row.id);
}
