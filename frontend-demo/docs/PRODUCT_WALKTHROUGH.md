# TAGGATE Prototype Product Walkthrough

This document is written as a product storytelling guide for NotebookLM, stakeholder demos, product presentations, and narrated walkthroughs. It explains what the TAGGATE prototype does, how the application is organized, and how each user role experiences the platform.

## 1. Executive Summary

TAGGATE is a Smart Community and Property Management Platform designed for residential societies, villa communities, gated townships, and future smart residential developments. It brings community administration, resident services, visitor security, property monitoring, complaints, utilities, services, groceries, notices, reports, and assistant-driven workflows into one unified product experience.

The business problem TAGGATE solves is fragmentation. In many communities, residents use separate channels for complaints, visitor approvals, service bookings, notices, payments, utility information, and property management. Administrators maintain records in spreadsheets. Security teams manage gate entries manually. Property owners and NRI owners depend on phone calls for updates. Service providers receive requests without a structured status flow. TAGGATE consolidates these workflows into a single role-based platform.

The prototype is used by seven stakeholder groups:

- Administrator
- Resident
- Property Owner
- NRI Owner
- Tenant
- Security Personnel
- Service Provider

Communities need this platform because operational clarity directly improves resident satisfaction, security control, maintenance response time, property transparency, and administrative efficiency. TAGGATE gives each stakeholder only the tools they need, while giving community operators a complete picture of the society.

Key benefits include faster complaint resolution, structured visitor management, improved tenant onboarding, centralized notices, better utility visibility, simulated marketplace workflows, remote property monitoring, and a foundation for future smart home and IoT integrations.

## 2. Product Vision

TAGGATE is envisioned as a unified operating system for modern residential communities. The product brings together the daily workflows of community life and property operations into a connected digital layer.

For community management, TAGGATE helps administrators manage residents, notices, vendors, reports, and operational dashboards. Instead of relying on scattered messages or manual files, the administrator has structured records and clear status views.

For property management, TAGGATE maintains property numbers, property types, owner information, occupancy status, tenants, maintenance information, and inspection reports. This is useful for both residents living in the community and owners managing homes remotely.

For security operations, TAGGATE supports visitor registration, visitor approval, entry verification, domestic staff management, vehicle records, and incident reporting. Security teams can record gate activity and maintain logs in a structured interface.

For resident services, TAGGATE supports complaints, home service requests, grocery ordering, utilities, notices, community events, amenities, and a conversational community assistant.

For vendor management, the platform gives administrators a way to manage service providers and gives service providers their own role experience for bookings, job requests, completed jobs, and ratings.

For utility monitoring, residents can view electricity usage, water usage, maintenance charges, payment reminders, and usage alerts.

For future smart home integration, the SRS describes support for smart meters, water tank sensors, appliances, CCTV systems, access control systems, WhatsApp notifications, payment gateways, and automated ticket generation. The prototype positions these as future-ready extensions.

## 3. Technology Overview

The prototype is built with Next.js using the App Router. In business terms, this means the application is organized as a modern web app with clear page routes and fast navigation between screens.

TypeScript is used to make the code safer and more predictable. It helps define roles, module keys, data types, and component contracts so the prototype remains maintainable as more features are added.

Tailwind CSS is used for styling, supported by CSS modules where desktop and mobile layouts differ significantly. The app keeps a consistent TAGGATE visual theme: teal branding, white cards, soft borders, compact controls, and clear operational dashboards.

The component architecture separates the product into desktop views, mobile views, and shared components. Desktop views use sidebars, tables, multi-column layouts, and dashboard cards. Mobile views use touch-friendly cards, bottom navigation, compact forms, and smaller information blocks.

Role-Based Access Control is implemented on the frontend. Users select a demo role at login. That role is stored in local browser storage as a mock session. Navigation menus and protected routes use that role to show or block access to modules.

This is a prototype. It does not connect to a database, backend, payment provider, authentication provider, or external service. All workflows are simulated using local mock data and frontend state.

## 4. Application Architecture

The prototype lives inside the `frontend-demo` folder.

Important folders include:

- `src/app`: Next.js App Router pages and routes.
- `src/components/desktop`: Desktop-specific views.
- `src/components/mobile`: Mobile-specific views.
- `src/components/shared`: Shared UI, session, device selection, route protection, and reusable wrappers.
- `src/data`: Static mock JSON seed data.
- `src/lib`: RBAC configuration, generated mock data, module data mapping, and TypeScript types.
- `docs`: SRS, screenshots, assumptions, implementation analysis, diagrams, and this walkthrough.

The desktop implementation uses `DesktopShell`, sidebar navigation, role dashboards, tables, filters, modal forms, and multi-column layouts. Desktop is aimed at administrators, property teams, security supervisors, and users who need broader operational visibility.

The mobile implementation uses `MobileScreen`, `MobileTopBar`, `MobileBottomNav`, mobile cards, touch controls, and compact forms. Mobile is designed around quick action: approving a visitor, raising a complaint, checking utilities, booking a service, or reviewing notifications.

Shared components include `DeviceView`, `ProtectedPage`, `SessionProvider`, `ModuleRoute`, and UI primitives such as buttons, cards, badges, fields, inputs, modals, pagination, empty states, loading states, error states, and toasts.

Mock data is generated in `src/lib/data.ts`. The prototype includes realistic volumes such as 120 residents, 60 properties, 78 tenants, 112 complaints, 220 visitors, 105 services, 210 products, 36 grocery orders, 34 security incidents, 24 vendors, utilities, and NRI reports.

## 5. User Roles

### Administrator

The Administrator is responsible for overall community management.

Responsibilities include managing residents, properties, tenants, complaints, visitors, security operations, notices, vendors, services, and reports.

Available modules include Dashboard, Residents, Properties, Tenants, Complaints, Visitors, Security, Notices, Vendors, Services, and Reports.

Dashboard widgets include total residents, total properties, active tenants, pending complaints, today's visitors, service requests, and utility alerts.

Permissions include creating and updating records, reviewing operational data, assigning complaints, publishing notices, viewing reports, and simulating export actions.

### Resident

The Resident uses TAGGATE for day-to-day community services.

Responsibilities include raising complaints, approving visitors, booking services, ordering groceries, checking utilities, viewing notices, and using the community assistant.

Available modules include Dashboard, Properties, Complaints, Visitors, Services, Groceries, Utilities, Notices, and Assistant.

Dashboard widgets summarize community status, properties, complaints, visitors, services, and utilities.

Permissions include creating complaints, approving visitors, booking services, placing grocery orders in mock workflows, viewing usage, and interacting with the assistant.

### Property Owner

The Property Owner manages owned properties and tenant-related workflows.

Responsibilities include viewing property information, adding tenants, monitoring occupancy, checking maintenance history, and reviewing visitor logs.

Available modules include Dashboard, Properties, Tenants, Complaints, Visitors, and NRI Monitoring.

Dashboard widgets highlight properties, tenants, occupancy status, visitor activity, and maintenance updates.

Permissions include managing owned property records, creating or updating tenant records, tracking occupancy, and viewing relevant property updates.

### NRI Owner

The NRI Owner monitors property remotely.

Responsibilities include remote property monitoring, occupancy tracking, inspection report review, maintenance update review, and property report access.

Available modules include Dashboard, NRI Monitoring, Properties, Tenants, Reports, and Notices.

Dashboard widgets focus on occupancy status, recent activities, property alerts, and inspection history.

Permissions include viewing property status, inspection records, maintenance reports, tenant information, and mock reports.

### Tenant

The Tenant uses community services while living in a rented property.

Responsibilities include raising complaints, managing visitors, viewing notices, booking services, and ordering groceries.

Available modules include Dashboard, Complaints, Visitors, Notices, Services, and Groceries.

Dashboard widgets show active complaints, visitor activity, service status, notices, and grocery orders.

Permissions include creating complaints, using community services, managing visitor workflows, and viewing notices.

### Security Personnel

Security Personnel manage gate and safety workflows.

Responsibilities include registering visitors, verifying entries, managing domestic staff, maintaining vehicle records, and recording incidents.

Available modules include Dashboard, Visitors, and Security.

Dashboard widgets highlight visitors, gate status, incidents, and verification workload.

Permissions include registering visitors, verifying entries, updating visitor statuses, recording incidents, and maintaining security-related logs.

### Service Provider

The Service Provider manages service bookings and job execution.

Responsibilities include viewing bookings, accepting jobs, updating service status, completing jobs, and reviewing ratings.

Available modules include Dashboard, Bookings, Services, and Ratings.

Dashboard widgets show job requests, accepted jobs, completed jobs, and ratings.

Permissions include accepting mock bookings, updating job status, completing service requests, and reviewing feedback.

## 6. Login Experience

The login page is available at `/login`.

The prototype presents two login methods:

- Mobile Number plus OTP
- Email plus Password

Because this is a prototype, these fields are visual and simulated. The main way to enter the app is through demo role buttons:

- Login as Administrator
- Login as Resident
- Login as Property Owner
- Login as NRI Owner
- Login as Tenant
- Login as Security Personnel
- Login as Service Provider

When a user selects a role, the app stores that selected role in local browser storage. The app then routes the user to the dashboard. From that point forward, the sidebar on desktop and the bottom navigation on mobile show the modules allowed for that role.

If a user attempts to open a route that is not permitted for the selected role, `ProtectedPage` blocks access and shows an access blocked screen with options to switch role or return to the dashboard.

## 7. Administrator Walkthrough

The Administrator begins at the role dashboard. This dashboard provides a high-level operational view of the community. It shows total residents, total properties, active tenants, pending complaints, today's visitors, service requests, and utility alerts. The business value is immediate visibility: the administrator can understand the operational health of the society without opening every module.

The Resident Management page allows the administrator to review resident records, search records, sort records, paginate through the list, add new residents, edit existing residents, and delete local mock records. It supports resident activation status and property association. The business value is a structured resident directory.

The Property Management page stores property number, type, owner, occupancy, and maintenance due information. Administrators can add or update property records. The business value is a single source of truth for the community's physical inventory.

The Tenant Management page supports onboarding data such as tenant name, property, move-in date, move-out date, documents, and approval status. Administrators can simulate tenant approval workflows. The business value is better compliance and visibility into rented properties.

The Complaint Management page tracks category, description, status, assignee, and priority. Administrators can assign issues and update status. The business value is faster resolution and better accountability.

The Visitor Management page provides visitor records with purpose, property, status, and time. Administrators can review gate activity and visitor history. The business value is stronger security oversight.

The Security page includes incidents, domestic staff, vehicles, and verification-related workflows. It supports mock incident records and security status updates. The business value is safer, more auditable security operations.

The Community Communication area is represented through Notices and Notifications. Administrators can publish or manage notice-like records in the prototype. Residents and tenants can view community updates. The business value is consistent communication.

The Reports page provides mock reports for residents, properties, tenants, complaints, visitors, services, and utilities. It includes search, filtering behavior through table controls, pagination, and a mock export button. The business value is operational reporting for committees, facility teams, and community managers.

## 8. Resident Walkthrough

The Resident logs in and sees a dashboard focused on community services. The dashboard summarizes available modules and key community activity.

In Complaints, a resident can raise an issue such as "Water leakage in kitchen." The form validates required fields and stores the complaint in local state. The resident can then track status changes such as Open, Assigned, and Resolved.

In Visitors, a resident can review visitor entries and simulate approval workflows. A realistic scenario is a delivery person arriving at the gate. The visitor is marked as At Gate or Pre-approved, and the resident can review the log.

In Utilities, the resident can view electricity usage, water usage, and maintenance charges. The prototype includes daily, weekly, and monthly usage values, plus alerts such as high water usage and maintenance payment reminders.

In Services, the resident can browse service categories such as plumbing, electrical, housekeeping, pest control, and appliance support. They can simulate booking a service and track provider status.

In Groceries, the resident can browse products such as milk, tomatoes, rice, eggs, bread, curd, onions, apples, wheat flour, and tea. The grocery workflow is simulated through local product and order data.

In Notices, the resident can view community announcements, maintenance notices, payment reminders, and event updates.

In Assistant, the resident can use conversational input. For example, typing "Water leakage in kitchen" creates a mock plumbing complaint. Typing "Book electrician tomorrow" creates a mock service request. Typing "Show electricity usage" returns usage information. Typing "How much maintenance is pending?" returns mock dues.

## 9. Property Owner Walkthrough

The Property Owner experience focuses on ownership and tenant visibility.

In Properties, the owner can review owned property information, occupancy status, maintenance due values, and property-level details.

In Tenant Management, the owner can simulate adding tenant details. The prototype tracks tenant name, property, move-in date, move-out date, document set, and approval status.

Maintenance tracking is represented through complaint records, NRI monitoring records, and property status data. This helps the owner understand what is happening with a property even if they are not handling day-to-day operations.

Occupancy monitoring is available through property records and NRI monitoring records. The owner can see whether a property is owner occupied, tenant occupied, or vacant.

## 10. NRI Owner Walkthrough

The NRI Owner experience is designed for remote confidence.

Remote Property Monitoring is available through the NRI Monitoring module. It shows properties, occupancy, inspection dates, and maintenance updates.

Inspection Reports show mock inspection history such as "Completed June 2, 2026." This gives remote owners a clear review trail.

Maintenance Updates include items such as garden trimming scheduled or AC inspection completed. This helps remote owners understand whether the property is being maintained.

Occupancy Tracking shows whether a property is vacant or tenant occupied. The business value is transparency for owners who are outside the city or country.

## 11. Tenant Walkthrough

The Tenant role receives a focused set of community tools.

Tenants can raise complaints for issues in their property or shared areas. They can track complaint status and view updates.

Tenants can manage visitors through the Visitors module. This supports guest and delivery flows.

Tenants can access Services for home service booking and Groceries for product ordering.

Tenants can view Community Notices so they remain informed about maintenance, events, policy changes, and reminders.

The Tenant experience is intentionally smaller than the Administrator experience because tenants do not need access to resident administration, reports, vendor management, or property ownership controls.

## 12. Security Personnel Walkthrough

Security Personnel log in to a focused gate operations experience.

Visitor Registration allows security staff to record visitor name, purpose, property, status, and time. This supports guest, delivery, and service personnel entries.

Entry Verification lets security staff simulate verifying a visitor at the gate. Visitor statuses such as At Gate, Pre-approved, and Exited help represent the gate lifecycle.

Vehicle Records and Domestic Staff Management are represented in the Security module as security-related records and workflows.

Incident Reporting allows security personnel to record safety events such as late-night delivery verification or parking access disputes. Each incident has a status and severity.

The business value is stronger operational discipline at the gate and better documentation of security activity.

## 13. Service Provider Walkthrough

The Service Provider role focuses on jobs and ratings.

Job Requests are represented through Bookings and Services. Providers can review service categories, assigned jobs, status, and ratings.

Bookings show accepted and completed service records. Providers can simulate accepting a booking, updating a status, and completing a job.

Status Updates are handled through editable local records. A provider can move a request from Available to Accepted or Completed in the prototype.

Ratings show provider quality and resident feedback. This helps community teams and residents understand service performance.

## 14. Complaint Management Workflow

A resident notices a water leakage issue in the kitchen.

First, the resident opens the Complaints module or the Assistant. In the module workflow, the resident creates a complaint with category, description, and priority. In the assistant workflow, the resident types "Water leakage in kitchen."

The system validates the complaint information. If required fields are missing, the form shows errors. If the information is valid, the complaint is saved in local state with a mock ticket status.

The administrator opens the Complaints module, searches or filters the list, and finds the complaint. The administrator assigns the issue to a maintenance provider and updates the status from Open to Assigned.

As work progresses, the status can be updated again to Resolved. Complaint history is represented by the record list and status values in the prototype.

The business value is a transparent lifecycle: resident request, administrator assignment, status tracking, and resolution.

## 15. Visitor Management Workflow

A visitor arrives at the community gate.

Security Personnel register the visitor with name, purpose, property, status, and time. The record appears in Visitor Management.

If resident approval is required, the resident reviews visitor information in the Visitors module and simulates approval. The visitor can move to Pre-approved.

Security Personnel verify entry at the gate. The visitor can be marked as At Gate or Exited in the mock record flow.

The visitor log remains available for administrators and permitted roles. The business value is traceability: every visitor has a record, status, purpose, and property association.

## 16. Marketplace Workflow

The Service Marketplace starts when a resident opens Services. The resident browses categories such as plumbing, electrical, housekeeping, AC service, pest control, or appliance support. The resident creates a service booking through a simulated action.

The Service Provider views bookings and job requests. The provider accepts a booking, updates the status, completes the service, and receives a rating. These actions are simulated through local state and editable records.

The Grocery Marketplace starts when a resident opens Groceries. The resident browses mock products, searches or sorts product data, and simulates adding products to a cart. The checkout and order tracking flow is represented through grocery order records with statuses such as Packed, Out for Delivery, and Delivered.

The business value of the marketplace is convenience. Residents can request essential services and household goods without leaving the community platform.

## 17. Utility Monitoring

Utility Monitoring gives residents and authorized roles visibility into electricity, water, and maintenance charges.

Electricity Usage is shown with daily, weekly, and monthly values. The prototype includes a weekly usage example of 112 kWh and a monthly usage example of 438 kWh.

Water Usage is shown with daily, weekly, and monthly values. The prototype includes a high usage alert for water.

Maintenance Charges show dues such as Rs 12,500 due. The system also represents payment reminders and usage alerts.

The business value is awareness. Residents can understand consumption, respond to alerts, and stay informed about dues.

## 18. Community Assistant

The Community Assistant is a conversational interface for community services.

The assistant supports mock responses for natural language examples:

When a resident types "Water leakage in kitchen," the assistant creates a mock complaint ticket and categorizes it as Plumbing.

When a resident types "Book electrician tomorrow," the assistant creates a mock service request for an electrician.

When a resident types "Show electricity usage," the assistant returns a weekly electricity usage summary.

When a resident types "How much maintenance is pending?" the assistant returns the mock maintenance due amount.

Behind the scenes, the prototype checks the text of the message, detects simple keywords, and returns a simulated response. In a production system, this could become an AI-powered assistant that creates real tickets, books services, checks live utility systems, and answers community policy questions.

## 19. Reports and Analytics

Reports are available to roles such as Administrator and NRI Owner.

Resident Reports summarize resident records, statuses, and property associations.

Property Reports summarize property inventory, ownership, occupancy, and maintenance dues.

Tenant Reports summarize tenant onboarding, documents, move-in dates, move-out dates, and approval status.

Complaint Reports summarize categories, priorities, statuses, and assignments.

Visitor Reports summarize gate activity, visitor purpose, property destination, and entry status.

Service Reports summarize service categories, providers, booking status, and ratings.

Utility Reports summarize electricity usage, water usage, maintenance charges, alerts, and reminders.

Dashboards and reports include KPIs such as total residents, total properties, active tenants, pending complaints, today's visitors, service requests, and utility alerts. Export buttons are included as mock UI actions.

## 20. Mobile Experience

The mobile experience is not simply a stacked desktop screen. It has dedicated mobile components.

Mobile navigation uses a bottom navigation bar that shows the full role-based menu for the selected user. When a role has many modules, the menu scrolls horizontally so mobile and desktop expose the same options.

Mobile dashboards use cards, large touch targets, compact summaries, and action-oriented layouts.

Mobile module pages use card lists instead of wide tables. Users can search, sort, paginate, add, edit, delete, export, and trigger mock workflows from touch-friendly controls.

Mobile forms use large inputs and modal dialogs. Success messages appear as toasts. Empty states are designed to be clear and easy to understand on small screens.

The business value is continuity. A resident can approve a visitor from a phone, a security guard can verify an entry at the gate, and an administrator can still review records from a tablet or mobile device.

## 21. Future Roadmap

The SRS defines future phases beyond the current prototype.

Smart Appliance Monitoring would allow the platform to connect with smart meters, air conditioners, water pumps, water purifiers, solar systems, and water tank sensors.

IoT Sensors would detect abnormal behavior such as excessive power consumption, continuous motor operation, sensor abnormalities, and unusual water usage.

CCTV Integration would extend security operations with camera-aware monitoring and incident review.

Access Control Systems would connect visitor approvals and gate verification to physical entry devices.

WhatsApp Notifications would allow residents and administrators to receive important reminders, visitor approvals, complaint updates, and payment alerts through a familiar communication channel.

Payment Gateway Integration would support maintenance payments, amenity bookings, service fees, grocery orders, and billing workflows.

Automatic Ticket Generation would allow smart devices, utility alerts, and assistant conversations to create maintenance tickets without manual entry.

The current prototype is designed as a foundation for these future capabilities.

## 22. Demo Script

Welcome to TAGGATE, a Smart Community and Property Management Platform for residential societies, villa communities, gated townships, and future-ready smart communities.

In many communities, residents, administrators, security teams, property owners, and service providers all work through separate channels. Complaints are sent through messages, visitors are handled manually at the gate, notices are scattered, utility information is hard to track, and property owners often depend on phone calls for updates. TAGGATE brings these workflows into one unified platform.

We begin at the login screen. The prototype supports two login methods: Mobile Number plus OTP and Email plus Password. For the demo, we use role-based login buttons. Each button represents a different stakeholder: Administrator, Resident, Property Owner, NRI Owner, Tenant, Security Personnel, and Service Provider.

Let us start as an Administrator. After login, we land on the Administrator dashboard. The dashboard gives a high-level operational view of the community: total residents, total properties, active tenants, pending complaints, today's visitors, service requests, and utility alerts. This immediately tells the community manager where attention is needed.

From the sidebar, the Administrator can open Resident Management. Here, resident records can be searched, sorted, paginated, added, edited, or deleted in the local prototype state. The same pattern appears across the operational modules, giving the product a consistent management experience.

Next, we open Property Management. This page tracks property number, type, owner, occupancy status, and maintenance dues. For a large community, this becomes the central property register.

Tenant Management supports tenant onboarding. It includes move-in dates, move-out dates, documents, and approval status. This helps administrators and property owners maintain compliance and visibility.

Complaint Management shows how TAGGATE improves maintenance operations. A resident can raise a complaint, such as water leakage in the kitchen. The administrator can review the complaint, assign it, update the status, and track it through resolution.

Visitor Management supports gate workflows. A visitor can be registered, approved by the resident, verified by security, and logged for future reference. This gives both residents and security staff a structured workflow.

Now let us switch to the Resident role. The Resident dashboard focuses on daily life: complaints, visitors, services, groceries, utilities, notices, and the community assistant. A resident can raise a complaint, approve a visitor, book a service, order groceries, view utility usage, and check maintenance dues.

In Utilities, the resident can view electricity usage, water usage, and maintenance charges. The prototype also shows alerts such as high water usage and payment reminders.

The Service Marketplace lets residents browse service categories and simulate booking a service. A service provider can later accept the job, update its status, complete it, and receive ratings.

The Grocery Marketplace provides product browsing and mock order tracking. Residents can review products and follow simulated order statuses such as Packed, Out for Delivery, and Delivered.

Now we open the Community Assistant. This is the conversational interface. If the resident types "Water leakage in kitchen," the assistant creates a mock plumbing complaint. If the resident types "Book electrician tomorrow," it creates a mock service request. If the resident asks "Show electricity usage," it returns a usage summary. If the resident asks "How much maintenance is pending?" it returns the mock dues amount.

Next, we switch to Security Personnel. This experience focuses on visitor registration, entry verification, domestic staff, vehicle records, and incident reporting. Security teams can record gate activity and maintain a clear visitor log.

Now we switch to Service Provider. This role sees bookings, services, and ratings. Providers can review job requests, accept bookings, update statuses, complete jobs, and review feedback.

Reports are available for administrators and NRI owners. Reports cover residents, properties, tenants, complaints, visitors, services, and utilities. Export buttons are included as mock actions, showing how reporting workflows would work in production.

The prototype also supports a mobile experience. Mobile is built with separate components, not just responsive desktop stacking. It uses a bottom navigation bar, card-based lists, touch-friendly forms, and compact workflows. The mobile menu shows the same role-based module options as desktop, with horizontal scrolling when needed.

Looking ahead, TAGGATE is designed for smart community evolution. Future phases include smart appliance monitoring, IoT sensors, CCTV integration, access control systems, WhatsApp notifications, payment gateway integration, and automatic ticket generation.

In summary, TAGGATE turns a residential community into a connected digital operating system. It improves administration, resident convenience, property transparency, security control, service delivery, and future smart-home readiness.

## 23. Key Takeaways

TAGGATE centralizes the major workflows of a modern residential community.

Core capabilities include role-based dashboards, resident management, property management, tenant onboarding, complaint tracking, visitor management, security operations, notices, services, groceries, utilities, assistant workflows, reports, and mobile access.

The business value is operational clarity. Administrators get control. Residents get convenience. Property owners get transparency. Security teams get structure. Service providers get organized job flows.

The prototype demonstrates scalability through generated mock data and modular role-based routing. It can represent small societies, villa communities, gated townships, and future multi-community deployments.

The future potential is strong because the platform is already organized around extensible modules. Smart meters, IoT sensors, CCTV, access control, payments, WhatsApp notifications, and automated tickets can all become natural extensions of the TAGGATE product vision.
