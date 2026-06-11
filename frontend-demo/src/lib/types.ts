export type Priority = "High" | "Medium" | "Low";
export type Status = "Active" | "Inactive" | "Pending" | "Approved" | "Open" | "Assigned" | "Resolved" | string;

export type NotificationItem = {
  id: string;
  title: string;
  date: string;
  type: string;
  priority: Priority;
  message: string;
};

export type Amenity = {
  id: string;
  name: string;
  icon: string;
  hours: string;
  status: "Available" | "Booked";
  fee: number;
  slots: string[];
  disabledSlots: string[];
};

export type EventItem = {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  description: string;
  status: "Upcoming" | "Past";
};

export type TableRecord = Record<string, string | number>;
