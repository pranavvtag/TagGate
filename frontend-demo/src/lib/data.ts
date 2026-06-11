import mockData from "@/data/mock-data.json";
import type { Amenity, EventItem, NotificationItem } from "@/lib/types";

const firstNames = ["Aarav", "Isha", "Rohan", "Meera", "Kabir", "Ananya", "Vihaan", "Sara", "Dev", "Nisha", "Arjun", "Tara"];
const lastNames = ["Rao", "Menon", "Nair", "Thomas", "Verma", "Kapoor", "Iyer", "Shah", "Pillai", "Mathew", "Shetty", "Khan"];
const categories = ["Plumbing", "Electrical", "Housekeeping", "Security", "Appliance", "Pest Control"];
const serviceProviders = ["AquaFix Services", "VoltCare", "CleanNest", "CoolAir Experts", "SecureGate Crew", "HomeCare Pro"];
const groceryNames = ["Milk 1L", "Tomatoes 1kg", "Rice 5kg", "Eggs 12pc", "Bread", "Curd 500g", "Onions 1kg", "Apples 1kg", "Wheat Flour 5kg", "Tea 250g"];

function nameAt(index: number) {
  return `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]}`;
}

function propertyAt(index: number) {
  const block = ["A", "B", "C", "D", "E"][index % 5];
  return `Villa ${block}-${String(index + 101).padStart(3, "0")}`;
}

export const residents = Array.from({ length: 120 }, (_, index) => ({
  id: `r-${String(index + 1).padStart(3, "0")}`,
  name: nameAt(index),
  property: propertyAt(index),
  role: index % 11 === 0 ? "NRI Owner" : index % 7 === 0 ? "Tenant" : index % 5 === 0 ? "Property Owner" : "Resident",
  phone: `+91 98${String(70000000 + index * 137).slice(0, 8)}`,
  status: index % 13 === 0 ? "Inactive" : index % 9 === 0 ? "Pending" : "Active"
}));

export const properties = Array.from({ length: 60 }, (_, index) => ({
  id: `p-${String(index + 1).padStart(3, "0")}`,
  number: propertyAt(index),
  type: index % 4 === 0 ? "Apartment" : "Villa",
  owner: nameAt(index + 2),
  occupancy: index % 6 === 0 ? "Vacant" : index % 4 === 0 ? "Tenant Occupied" : "Owner Occupied",
  maintenanceDue: index % 5 === 0 ? 0 : 4500 + index * 210
}));

export const tenants = Array.from({ length: 78 }, (_, index) => ({
  id: `t-${String(index + 1).padStart(3, "0")}`,
  name: nameAt(index + 5),
  property: propertyAt(index + 15),
  moveIn: `June ${String((index % 25) + 1).padStart(2, "0")}, 2026`,
  moveOut: `May ${String((index % 25) + 1).padStart(2, "0")}, 2027`,
  documents: index % 3 === 0 ? "Aadhaar, PAN, Rental Agreement" : "Aadhaar, Passport",
  approval: index % 8 === 0 ? "Pending" : "Approved"
}));

export const visitors = Array.from({ length: 220 }, (_, index) => ({
  id: `v-${String(index + 1).padStart(3, "0")}`,
  name: index % 2 === 0 ? `${nameAt(index)} Guest` : `${nameAt(index)} Delivery`,
  purpose: index % 3 === 0 ? "Guest" : index % 3 === 1 ? "Delivery" : "Service Visit",
  property: propertyAt(index % 60),
  status: index % 7 === 0 ? "At Gate" : index % 5 === 0 ? "Exited" : "Pre-approved",
  time: `Today, ${(8 + (index % 12)).toString().padStart(2, "0")}:${index % 2 === 0 ? "30" : "15"} ${index % 12 > 4 ? "PM" : "AM"}`
}));

export const complaints = Array.from({ length: 112 }, (_, index) => ({
  id: `c-${String(index + 1).padStart(3, "0")}`,
  category: categories[index % categories.length],
  description: `${categories[index % categories.length]} issue reported at ${propertyAt(index % 60)}`,
  status: index % 6 === 0 ? "Resolved" : index % 4 === 0 ? "Assigned" : "Open",
  assignee: index % 4 === 0 ? serviceProviders[index % serviceProviders.length] : "Unassigned",
  priority: index % 10 === 0 ? "High" : index % 3 === 0 ? "Medium" : "Low"
}));

export const services = Array.from({ length: 105 }, (_, index) => ({
  id: `s-${String(index + 1).padStart(3, "0")}`,
  category: categories[index % categories.length],
  provider: serviceProviders[index % serviceProviders.length],
  status: index % 5 === 0 ? "Completed" : index % 4 === 0 ? "Accepted" : "Available",
  rating: Number((4.1 + (index % 9) / 10).toFixed(1))
}));

export const products = Array.from({ length: 210 }, (_, index) => ({
  id: `prod-${String(index + 1).padStart(3, "0")}`,
  name: groceryNames[index % groceryNames.length],
  category: index % 4 === 0 ? "Dairy" : index % 4 === 1 ? "Produce" : index % 4 === 2 ? "Staples" : "Household",
  price: 35 + (index % 20) * 12,
  stock: index % 9 === 0 ? "Low Stock" : "Available"
}));

export const groceryOrders = Array.from({ length: 36 }, (_, index) => ({
  id: `g-${String(index + 1).padStart(3, "0")}`,
  items: `${groceryNames[index % groceryNames.length]}, ${groceryNames[(index + 3) % groceryNames.length]}`,
  amount: 210 + index * 18,
  status: index % 5 === 0 ? "Delivered" : index % 3 === 0 ? "Packed" : "Out for Delivery"
}));

export const securityIncidents = Array.from({ length: 34 }, (_, index) => ({
  id: `si-${String(index + 1).padStart(3, "0")}`,
  title: index % 2 === 0 ? "Late night delivery verification" : "Parking access dispute",
  location: propertyAt(index % 60),
  status: index % 3 === 0 ? "Closed" : "Open",
  severity: index % 6 === 0 ? "High" : "Medium"
}));

export const vendors = Array.from({ length: 24 }, (_, index) => ({
  id: `vendor-${String(index + 1).padStart(3, "0")}`,
  name: serviceProviders[index % serviceProviders.length],
  category: categories[index % categories.length],
  contact: `+91 80${String(40000000 + index * 271).slice(0, 8)}`,
  status: index % 4 === 0 ? "Review" : "Active"
}));

export const utilityUsage = [
  { id: "u-001", name: "Electricity", daily: "18 kWh", weekly: "112 kWh", monthly: "438 kWh", alert: "Normal" },
  { id: "u-002", name: "Water", daily: "620 L", weekly: "4,140 L", monthly: "16,280 L", alert: "High usage" },
  { id: "u-003", name: "Maintenance Charges", daily: "-", weekly: "-", monthly: "Rs 12,500 due", alert: "Reminder sent" }
];

export const nriReports = Array.from({ length: 18 }, (_, index) => ({
  id: `nri-${String(index + 1).padStart(3, "0")}`,
  property: propertyAt(index + 20),
  occupancy: index % 3 === 0 ? "Vacant" : "Tenant Occupied",
  inspection: `Completed June ${(index % 20) + 1}, 2026`,
  maintenance: index % 2 === 0 ? "Garden trimming scheduled" : "AC inspection completed"
}));

export const data = {
  ...mockData,
  community: {
    name: "AIRA Smart Villas",
    resident: "Achintya",
    weather: "26 C",
    systemStatus: "All Systems Normal"
  },
  amenities: mockData.amenities.map((amenity) => ({ ...amenity, name: amenity.name === "CafÃ©" ? "Cafe" : amenity.name })),
  residents,
  properties,
  tenants,
  visitors,
  complaints,
  services,
  products,
  groceryOrders,
  securityIncidents,
  vendors,
  utilities: utilityUsage,
  nriReports
};

export const notifications = mockData.notifications as NotificationItem[];
export const amenities = data.amenities as Amenity[];
export const events = mockData.events as EventItem[];

export function findAmenity(id: string) {
  return amenities.find((amenity) => amenity.id === id) ?? amenities[0];
}

export function findEvent(id: string) {
  return events.find((event) => event.id === id) ?? events[0];
}

export const assumptions = [
  "The supplied mobile screenshots define the resident-facing mobile UI; desktop screens were inferred from the SRS because no desktop screenshots were supplied.",
  "Authentication, payments, document uploads, exports, and chat automation are simulated locally without backend integrations.",
  "Phase 1 and Phase 2 SRS modules are represented as interactive mock workflows; future smart-home integrations are shown as monitoring/reporting placeholders.",
  "Tablet uses a dedicated DeviceView branch and favors compact desktop layouts where a separate tablet design was not provided."
];
