import {
  Bell,
  Bot,
  Building2,
  ClipboardList,
  Home,
  LayoutDashboard,
  Package,
  ShieldCheck,
  ShoppingBasket,
  Truck,
  Users,
  Wrench,
  Zap
} from "lucide-react";

export const roles = [
  "Administrator",
  "Resident",
  "Property Owner",
  "NRI Owner",
  "Tenant",
  "Security Personnel",
  "Service Provider"
] as const;

export type Role = (typeof roles)[number];

export type ModuleKey =
  | "dashboard"
  | "residents"
  | "properties"
  | "tenants"
  | "complaints"
  | "visitors"
  | "security"
  | "notices"
  | "vendors"
  | "services"
  | "groceries"
  | "utilities"
  | "assistant"
  | "reports"
  | "nri"
  | "bookings"
  | "ratings";

export type ModuleConfig = {
  key: ModuleKey;
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  description: string;
  workflows: string[];
};

export const modules: Record<ModuleKey, ModuleConfig> = {
  dashboard: {
    key: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Role-specific overview, alerts, and operational shortcuts.",
    workflows: ["View widgets", "Review alerts", "Open role actions"]
  },
  residents: {
    key: "residents",
    label: "Residents",
    href: "/residents",
    icon: Users,
    description: "Resident records, property association, activation, and deactivation.",
    workflows: ["Create resident", "Update profile", "Activate or deactivate account"]
  },
  properties: {
    key: "properties",
    label: "Properties",
    href: "/properties",
    icon: Home,
    description: "Property number, type, owner, occupancy, and maintenance status.",
    workflows: ["Add property", "Update occupancy", "Track owner holdings"]
  },
  tenants: {
    key: "tenants",
    label: "Tenants",
    href: "/tenants",
    icon: Building2,
    description: "Tenant onboarding, documents, move-in dates, and approvals.",
    workflows: ["Add tenant", "Validate documents", "Approve onboarding"]
  },
  complaints: {
    key: "complaints",
    label: "Complaints",
    href: "/complaints",
    icon: ClipboardList,
    description: "Complaint tickets, assignment, status tracking, and history.",
    workflows: ["Raise complaint", "Assign complaint", "Update status"]
  },
  visitors: {
    key: "visitors",
    label: "Visitors",
    href: "/visitors",
    icon: Truck,
    description: "Visitor registration, approvals, verification, and visitor logs.",
    workflows: ["Register visitor", "Approve visitor", "Verify entry"]
  },
  security: {
    key: "security",
    label: "Security",
    href: "/security",
    icon: ShieldCheck,
    description: "Domestic staff, vehicles, service personnel, and incident reports.",
    workflows: ["Record incident", "Manage staff", "Maintain vehicle records"]
  },
  notices: {
    key: "notices",
    label: "Notices",
    href: "/notices",
    icon: Bell,
    description: "Community notices, announcements, archives, and notification delivery.",
    workflows: ["Publish notice", "Archive announcement", "View notices"]
  },
  vendors: {
    key: "vendors",
    label: "Vendors",
    href: "/vendors",
    icon: Package,
    description: "Vendor and service provider records for community operations.",
    workflows: ["Add vendor", "Update vendor status", "Review service categories"]
  },
  services: {
    key: "services",
    label: "Services",
    href: "/services",
    icon: Wrench,
    description: "Home service marketplace bookings, provider actions, and ratings.",
    workflows: ["Book service", "Accept booking", "Complete job"]
  },
  groceries: {
    key: "groceries",
    label: "Groceries",
    href: "/groceries",
    icon: ShoppingBasket,
    description: "Product browsing, cart, orders, and order tracking.",
    workflows: ["Browse products", "Add to cart", "Place order"]
  },
  utilities: {
    key: "utilities",
    label: "Utilities",
    href: "/utilities",
    icon: Zap,
    description: "Electricity, water, maintenance dues, reminders, and usage alerts.",
    workflows: ["View usage", "Review alerts", "Check maintenance dues"]
  },
  assistant: {
    key: "assistant",
    label: "Assistant",
    href: "/assistant",
    icon: Bot,
    description: "Conversational interface for complaints, services, groceries, and utilities.",
    workflows: ["Create complaint by chat", "Book service by chat", "Check dues"]
  },
  reports: {
    key: "reports",
    label: "Reports",
    href: "/reports",
    icon: ClipboardList,
    description: "Mock reports for residents, properties, tenants, complaints, visitors, services, and utilities.",
    workflows: ["Filter report", "View summary", "Export report"]
  },
  nri: {
    key: "nri",
    label: "NRI Monitoring",
    href: "/nri",
    icon: Building2,
    description: "Remote property monitoring, occupancy, inspections, and maintenance updates.",
    workflows: ["Review inspection", "Track occupancy", "View maintenance update"]
  },
  bookings: {
    key: "bookings",
    label: "Bookings",
    href: "/bookings",
    icon: Wrench,
    description: "Service provider job requests, accepted bookings, and completed jobs.",
    workflows: ["Accept booking", "Update status", "Complete service"]
  },
  ratings: {
    key: "ratings",
    label: "Ratings",
    href: "/ratings",
    icon: Bell,
    description: "Completed service ratings and resident feedback.",
    workflows: ["View ratings", "Review feedback", "Track provider quality"]
  }
};

export const roleModules: Record<Role, ModuleKey[]> = {
  Administrator: ["dashboard", "residents", "properties", "tenants", "complaints", "visitors", "security", "notices", "vendors", "services", "reports"],
  Resident: ["dashboard", "properties", "complaints", "visitors", "services", "groceries", "utilities", "notices", "assistant"],
  "Property Owner": ["dashboard", "properties", "tenants", "complaints", "visitors", "nri"],
  "NRI Owner": ["dashboard", "nri", "properties", "tenants", "reports", "notices"],
  Tenant: ["dashboard", "complaints", "visitors", "notices", "services", "groceries"],
  "Security Personnel": ["dashboard", "visitors", "security"],
  "Service Provider": ["dashboard", "bookings", "services", "ratings"]
};

export const defaultRole: Role = "Administrator";

export function canAccess(role: Role, key: ModuleKey) {
  return roleModules[role].includes(key);
}

export function moduleForPath(pathname: string): ModuleKey {
  if (pathname === "/") {
    return "dashboard";
  }
  const found = Object.values(modules).find((module) => module.href !== "/" && pathname.startsWith(module.href));
  return found?.key ?? "dashboard";
}

export function modulesForRole(role: Role) {
  return roleModules[role].map((key) => modules[key]);
}

export const roleMatrix: Record<Role, string[]> = Object.fromEntries(
  roles.map((role) => [role, modulesForRole(role).map((module) => module.label)])
) as Record<Role, string[]>;
