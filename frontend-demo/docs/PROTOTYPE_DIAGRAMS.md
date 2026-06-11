# TagGate Prototype Diagrams

This document uses Mermaid diagrams. GitHub renders these diagrams directly in Markdown.

## Prototype Scope

```mermaid
flowchart TB
  SRS["SRS: TagGate Smart Community and Property Management"] --> Prototype["Next.js Prototype"]
  Prototype --> Auth["Mock Login and Role Session"]
  Prototype --> RBAC["Frontend RBAC"]
  Prototype --> Desktop["Desktop Views"]
  Prototype --> Mobile["Mobile Views"]
  Prototype --> Data["Local Mock Data"]

  Desktop --> Tables["Tables, Filters, Sorting, Pagination"]
  Desktop --> Dashboards["Role Dashboards"]
  Desktop --> Reports["Reports and Export UI"]

  Mobile --> Cards["Card Based Lists"]
  Mobile --> Touch["Touch Optimized Forms"]
  Mobile --> ScrollNav["Full Role Menu in Scrollable Bottom Nav"]

  Data --> NoBackend["No Backend, No Real APIs, No Database"]
```

## Role Use Case Diagram

```mermaid
flowchart LR
  Admin((Administrator))
  Resident((Resident))
  Owner((Property Owner))
  NRI((NRI Owner))
  Tenant((Tenant))
  Security((Security Personnel))
  Provider((Service Provider))

  ManageResidents([Manage Residents])
  ManageProperties([Manage Properties])
  ManageTenants([Manage Tenants])
  ManageComplaints([Manage Complaints])
  PublishNotices([Publish Notices])
  AccessReports([Access Reports])
  RaiseComplaint([Raise Complaint])
  ApproveVisitor([Approve Visitor])
  BookService([Book Service])
  OrderGroceries([Order Groceries])
  ViewUtilities([View Utility Usage])
  AddTenant([Add Tenant])
  MonitorRemote([Monitor Property Remotely])
  RegisterVisitor([Register Visitor])
  VerifyEntry([Verify Entry])
  RecordIncident([Record Incident])
  AcceptJob([Accept Job])
  UpdateJob([Update Service Status])

  Admin --> ManageResidents
  Admin --> ManageProperties
  Admin --> ManageTenants
  Admin --> ManageComplaints
  Admin --> PublishNotices
  Admin --> AccessReports

  Resident --> RaiseComplaint
  Resident --> ApproveVisitor
  Resident --> BookService
  Resident --> OrderGroceries
  Resident --> ViewUtilities

  Owner --> ManageProperties
  Owner --> AddTenant
  Owner --> MonitorRemote

  NRI --> MonitorRemote
  NRI --> AccessReports

  Tenant --> RaiseComplaint
  Tenant --> ApproveVisitor
  Tenant --> BookService
  Tenant --> OrderGroceries

  Security --> RegisterVisitor
  Security --> VerifyEntry
  Security --> RecordIncident

  Provider --> AcceptJob
  Provider --> UpdateJob
```

## Navigation and RBAC Flow

```mermaid
flowchart TD
  Start([User opens app]) --> Login{Role stored in localStorage?}
  Login -- No --> LoginPage["/login"]
  LoginPage --> SelectRole["Select demo role"]
  SelectRole --> StoreRole["Store role in mock session"]
  StoreRole --> Dashboard["Role dashboard"]

  Login -- Yes --> Dashboard
  Dashboard --> Menu["modulesForRole(role)"]
  Menu --> DesktopSidebar["Desktop sidebar shows all allowed modules"]
  Menu --> MobileBottomNav["Mobile bottom nav shows all allowed modules"]

  DesktopSidebar --> OpenRoute["Open route"]
  MobileBottomNav --> OpenRoute
  OpenRoute --> Guard{"ProtectedPage canAccess(role, module)?"}
  Guard -- Yes --> Render["Render desktop or mobile view via DeviceView"]
  Guard -- No --> Blocked["Access blocked screen with switch role action"]
```

## Application Architecture

```mermaid
flowchart TB
  App["App Router Routes"] --> Protected["ProtectedPage"]
  Protected --> Device["DeviceView"]
  Device --> DesktopComp["Desktop Component"]
  Device --> MobileComp["Mobile Component"]

  DesktopComp --> SharedUI["Shared UI Components"]
  MobileComp --> SharedUI

  Protected --> Session["SessionProvider"]
  Session --> LocalStorage["localStorage role"]
  Protected --> RBAC["src/lib/rbac.ts"]

  DesktopComp --> MockData["src/lib/data.ts"]
  MobileComp --> MockData
  MockData --> SourceJson["src/data/mock-data.json"]
  MockData --> GeneratedData["Generated mock records"]
```

## Login Sequence

```mermaid
sequenceDiagram
  actor User
  participant Login as Login Page
  participant Session as SessionProvider
  participant Storage as localStorage
  participant Router as Next Router
  participant Dashboard as Role Dashboard

  User->>Login: Click "Login as Resident"
  Login->>Session: login("Resident")
  Session->>Storage: set taggate-demo-role
  Login->>Router: push("/")
  Router->>Dashboard: render dashboard route
  Dashboard->>Session: read current role
  Dashboard->>Dashboard: show Resident modules and widgets
```

## Protected Route Sequence

```mermaid
sequenceDiagram
  actor User
  participant Nav as Role Menu
  participant Route as App Route
  participant Guard as ProtectedPage
  participant RBAC as rbac.ts
  participant View as DeviceView

  User->>Nav: Select module
  Nav->>Route: Navigate to route
  Route->>Guard: moduleKey
  Guard->>RBAC: canAccess(role, moduleKey)
  alt Allowed
    Guard->>View: render page
    View->>View: choose desktop, tablet, or mobile
  else Not allowed
    Guard->>User: show access blocked state
  end
```

## Role Dashboard Activity

```mermaid
flowchart TD
  A([Open dashboard]) --> B["Read selected role"]
  B --> C["Load allowed modules"]
  C --> D["Calculate mock dashboard widgets"]
  D --> E["Render role summary"]
  E --> F["Render module cards"]
  F --> G{User action}
  G -->|Open module| H["Navigate to protected module route"]
  G -->|Switch role| I["Go to login and update mock session"]
```

## Generic Module CRUD Activity

```mermaid
flowchart TD
  A([Open module page]) --> B["Load module rows from local mock data"]
  B --> C["Render desktop table or mobile cards"]
  C --> D{User action}
  D -->|Search| E["Filter records in frontend state"]
  D -->|Sort| F["Sort records by selected field"]
  D -->|Paginate| G["Show selected page"]
  D -->|Add| H["Open form modal with blank record"]
  D -->|Edit| I["Open form modal with selected record"]
  D -->|Delete| J["Remove record from local state"]
  D -->|Export| K["Show mock export success message"]
  H --> L{"Validate required fields"}
  I --> L
  L -->|Invalid| M["Show field errors"]
  L -->|Valid| N["Save to local state"]
  N --> O["Show success toast"]
```

## Complaint Workflow Sequence

```mermaid
sequenceDiagram
  actor Resident
  participant Complaints as Complaints Module
  participant State as Frontend State
  participant Admin as Admin View

  Resident->>Complaints: Add complaint
  Complaints->>Complaints: Validate category, description, priority
  Complaints->>State: Save mock complaint with Open status
  State-->>Resident: Success toast
  Admin->>Complaints: Open complaints list
  Complaints->>State: Read complaint rows
  Admin->>Complaints: Edit assignee and status
  Complaints->>State: Save assigned complaint locally
```

## Visitor Security Workflow

```mermaid
flowchart LR
  Resident((Resident)) --> Approve["Approve visitor"]
  Security((Security Personnel)) --> Register["Register visitor"]
  Security --> Verify["Verify entry"]
  Security --> Incident["Record incident"]

  Approve --> Logs["Visitor logs"]
  Register --> Logs
  Verify --> Logs
  Incident --> SecurityModule["Security module"]

  Logs --> Status{Visitor status}
  Status --> PreApproved["Pre-approved"]
  Status --> AtGate["At Gate"]
  Status --> Exited["Exited"]
```

## Service Provider Workflow

```mermaid
stateDiagram-v2
  [*] --> Available
  Available --> Requested: Resident books service
  Requested --> Accepted: Provider accepts booking
  Accepted --> InProgress: Provider starts job
  InProgress --> Completed: Provider completes service
  Completed --> Rated: Resident rates service
  Rated --> [*]
```

## Grocery Marketplace Activity

```mermaid
flowchart TD
  A([Open groceries]) --> B["Browse mock products"]
  B --> C["Search or filter products"]
  C --> D["Add product using simulated action"]
  D --> E["Create mock order"]
  E --> F["Track order status"]
  F --> G{"Status"}
  G --> Packed["Packed"]
  G --> OutForDelivery["Out for Delivery"]
  G --> Delivered["Delivered"]
```

## Amenity Booking Sequence

```mermaid
sequenceDiagram
  actor Resident
  participant Amenities as Amenities Page
  participant Booking as Book Amenity Page
  participant State as Local State
  participant Success as Confirmation Page

  Resident->>Amenities: Choose available amenity
  Amenities->>Booking: Navigate with amenity id
  Resident->>Booking: Select date and time slot
  Booking->>Booking: Validate date and slot
  Booking->>State: Simulate booking and payment
  Booking->>Success: Navigate to confirmation
  Success-->>Resident: Booking Confirmed
```

## Community Event Registration Sequence

```mermaid
sequenceDiagram
  actor Resident
  participant Events as Community Events
  participant Register as Event Registration
  participant Success as Success Page

  Resident->>Events: Select upcoming event
  Events->>Register: Navigate with event id
  Resident->>Register: Adjust guest count
  Register->>Register: Validate guest count
  Register->>Success: Confirm registration
  Success-->>Resident: Successfully Registered
```

## Conversational Assistant Activity

```mermaid
flowchart TD
  A([Resident sends chat message]) --> B{"Message intent"}
  B -->|Water leakage in kitchen| C["Create complaint"]
  B -->|Book electrician tomorrow| D["Create service request"]
  B -->|Show electricity usage| E["Show usage summary"]
  B -->|How much maintenance is pending| F["Show maintenance dues"]
  B -->|Other message| G["Capture generic mock action"]

  C --> H["Return ticket id and category"]
  D --> I["Return service request id"]
  E --> J["Return weekly usage"]
  F --> K["Return mock dues"]
  G --> L["Return assistant acknowledgement"]
```

## Reports Flow

```mermaid
flowchart TD
  A([Administrator or NRI Owner opens reports]) --> B["Load mock report rows"]
  B --> C["Search, sort, and paginate"]
  C --> D["Select report"]
  D --> E["View record count and status"]
  E --> F["Click Export"]
  F --> G["Show mock export success toast"]
```

## Data Model Overview

```mermaid
erDiagram
  RESIDENT ||--o{ PROPERTY : associated_with
  OWNER ||--o{ PROPERTY : owns
  PROPERTY ||--o{ TENANT : occupied_by
  RESIDENT ||--o{ COMPLAINT : raises
  PROPERTY ||--o{ VISITOR : receives
  SECURITY ||--o{ VISITOR : verifies
  SERVICE_PROVIDER ||--o{ SERVICE_BOOKING : accepts
  RESIDENT ||--o{ SERVICE_BOOKING : books
  RESIDENT ||--o{ GROCERY_ORDER : places
  PROPERTY ||--o{ UTILITY_USAGE : tracks
  NRI_OWNER ||--o{ INSPECTION_REPORT : reviews

  RESIDENT {
    string id
    string name
    string property
    string role
    string status
  }
  PROPERTY {
    string id
    string number
    string type
    string owner
    string occupancy
  }
  COMPLAINT {
    string id
    string category
    string description
    string status
    string priority
  }
  VISITOR {
    string id
    string name
    string purpose
    string status
    string time
  }
  SERVICE_BOOKING {
    string id
    string category
    string provider
    string status
    number rating
  }
```

## Desktop vs Mobile Rendering

```mermaid
flowchart LR
  Route["Route component"] --> DeviceView["DeviceView"]
  DeviceView --> Width{"Viewport width"}
  Width -->|>= 1024px| Desktop["Desktop component"]
  Width -->|768px to 1023px| Tablet["Tablet branch"]
  Width -->|< 768px| Mobile["Mobile component"]

  Desktop --> Sidebar["Sidebar navigation"]
  Desktop --> Tables["Tables and multi-column layouts"]
  Mobile --> BottomNav["Scrollable bottom navigation"]
  Mobile --> Cards["Card lists and touch controls"]
```

## Current Route Map

```mermaid
flowchart TB
  Login["/login"] --> Dashboard["/"]
  Dashboard --> Residents["/residents"]
  Dashboard --> Properties["/properties"]
  Dashboard --> Tenants["/tenants"]
  Dashboard --> Complaints["/complaints"]
  Dashboard --> Visitors["/visitors"]
  Dashboard --> Security["/security"]
  Dashboard --> Notices["/notices"]
  Dashboard --> Vendors["/vendors"]
  Dashboard --> Services["/services"]
  Dashboard --> Groceries["/groceries"]
  Dashboard --> Utilities["/utilities"]
  Dashboard --> Assistant["/assistant"]
  Dashboard --> Reports["/reports"]
  Dashboard --> NRI["/nri"]
  Dashboard --> Bookings["/bookings"]
  Dashboard --> Ratings["/ratings"]
  Dashboard --> Amenities["/amenities"]
  Dashboard --> Community["/community"]
```
