# GearGuard: Complete Feature List

## ✅ Implemented Features

### 1. **Dashboard** (`/`)

- **3 Critical Stat Cards**
  - Critical Equipment Count (health < 30%) - Red pulsing animation
  - Technician Load (average utilization across teams)
  - Open Requests Count
- **Tremor Charts**
  - Area Chart: Team Utilization over time
  - Donut Chart: Request Distribution by stage
- **Recent Requests Table**
  - Shows latest 5 requests with status badges
  - Click to navigate to Kanban board

### 2. **Kanban Board** (`/kanban`)

- **4 Stages**: New Request | In Progress | Repaired | Scrap
- **Drag & Drop** functionality (@hello-pangea/dnd)
- **Visual Indicators**:
  - Technician avatar with hover animations
  - Priority badges (Low, Medium, High, Critical)
  - Overdue indicator (red pulsing icon)
  - Stage-based color coding
- **Auto-save** on drag completion
- **Framer Motion** animations for cards and columns

### 3. **Equipment Management**

#### Equipment List (`/equipment`)

- **Search** by name or serial number
- **Filter** by department
- **Grid View** with equipment cards showing:
  - Name, Serial Number
  - Health percentage with color coding (red < 30%, yellow < 70%, green >= 70%)
  - Category, Department, Location, Team
  - Status (Active/Under Maintenance/Scrapped)
- Click card to view details

#### Equipment Form (`/equipment/new`, `/equipment/edit/:id`)

- **Required Fields**:
  - Equipment Name, Serial Number
  - Category (Production Equipment, Computer, Vehicle, Machinery, Tools)
  - Department, Location
  - Maintenance Team, Default Technician
- **Optional Fields**:
  - Assigned To (employee name)
  - Purchase Date, Warranty Expiry
  - Health % (0-100)
  - Status
- **Auto-populate**: Technician dropdown based on selected team

#### Equipment Detail (`/equipment/:id`)

- **Smart Button Implementation**:
  - "Maintenance" button with badge showing open request count
  - Toggle to show/hide all requests for this equipment
  - Badge animates when count > 0
- **Complete Equipment Info**:
  - All fields in organized grid
  - Health status with color coding
  - Purchase and warranty dates
- **Related Requests Section**:
  - Lists all maintenance requests for this equipment
  - Shows request type, priority, stage, technician
  - Click to edit request

### 4. **Maintenance Requests**

#### Request Form (`/requests/new`, `/requests/edit/:id`)

- **Auto-Fill Logic**:
  - Select equipment → automatically fills:
    - Category
    - Maintenance Team
    - Default Technician
  - Visual highlight of auto-filled fields (blue background)
- **Request Types**:
  - Corrective (Unplanned repair/breakdown)
  - Preventive (Scheduled maintenance)
- **Priority Levels**: Low, Medium, High, Critical
- **Fields**:
  - Subject, Description
  - Equipment (dropdown of active equipment)
  - Scheduled Date (required for Preventive)
  - Stage (auto-set to "New Request")

#### Request Workflow

1. **Create Request** → Auto-fills team and technician from equipment
2. **Stage: New Request** → Appears in Kanban "New Request" column
3. **Drag to "In Progress"** → Sets startDate automatically
4. **Drag to "Repaired"** → Sets completionDate
5. **Drag to "Scrap"** → Sets completionDate AND marks equipment as "Scrapped"

### 5. **Calendar View** (`/calendar`)

- **React Big Calendar** integration
- **Displays**: All Preventive maintenance requests
- **Features**:
  - Month, Week, Day, Agenda views
  - Click date → Create new preventive request with pre-filled scheduled date
  - Click event → Edit existing request
- **Color Coding**:
  - Blue: Normal priority
  - Orange: High/Critical priority
  - Green: Repaired
  - Red: Scrapped
- **Legend** for easy reference

### 6. **Team Management**

#### Team List (`/teams`)

- **Grid View** of all teams
- **Shows**:
  - Team name with icon
  - Member count
  - List of all team members
  - Specialization

#### Team Form (`/teams/new`, `/teams/:id`)

- **Team Info**: Name, Specialization
- **Dynamic Member Management**:
  - Add members with name and role (Technician, Lead Technician, Manager)
  - Remove members
  - Animated member list

### 7. **Navigation**

- **Navbar** with active link highlighting
- **Quick Links**:
  - Dashboard
  - Kanban Board
  - Equipment
  - Teams
  - Calendar
- **Quick Action Button**: "+ New Request" (always visible)

## 🎨 Animation & UX Features

### Framer Motion Animations

- **Page Load**: Fade in + slide up
- **Card Hover**: Scale 1.02
- **Button Tap**: Scale 0.95
- **Stat Cards**: Staggered children animations
- **Critical Equipment**: Pulsing red icon
- **Technician Avatars**: Rotate 360° on hover
- **Overdue Indicators**: Continuous pulsing

### @hello-pangea/dnd

- **Smooth drag feedback**: Opacity + shadow changes
- **Drop zones**: Visual highlight on drag over
- **Multi-column**: Drag between 4 stages

### Tremor Charts

- **AreaChart**: Smooth curves, gradient fills
- **DonutChart**: Interactive, responsive

### Lucide React Icons

- Dashboard, Wrench, Users, Calendar, Plus, Search, AlertCircle, Clock, Edit, Save, Trash, ArrowLeft, X

## 🔧 Backend API Features

### Equipment Endpoints

- `GET /api/equipment` - List all equipment
- `GET /api/equipment/:id` - Get equipment with related requests count
- `POST /api/equipment` - Create equipment
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Request Endpoints

- `GET /api/requests` - List all requests (with filters: stage, team, equipment)
- `GET /api/requests/:id` - Get single request
- `POST /api/requests` - Create request with auto-fill
- `PUT /api/requests/:id` - Update request (handles stage transitions)
- `DELETE /api/requests/:id` - Delete request

### Team Endpoints

- `GET /api/teams` - List all teams
- `GET /api/teams/:id` - Get single team
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Dashboard Endpoint

- `GET /api/dashboard` - Get aggregated stats:
  - Critical equipment count
  - Technician utilization
  - Open requests count
  - Team utilization chart data
  - Request distribution data
  - Recent requests

## 🎯 Business Logic Implementation

### ✅ Auto-Fill on Equipment Selection

When creating a request and selecting equipment, the system automatically populates:

- Equipment category
- Maintenance team (from equipment.maintenanceTeam)
- Assigned technician (from equipment.defaultTechnician)

### ✅ Smart Button with Badge

Equipment detail page shows "Maintenance" button with:

- Count badge of open requests (stage !== 'Repaired' && stage !== 'Scrap')
- Animated badge appearance
- Toggle to show full request list

### ✅ Scrap Logic

When a request is moved to "Scrap" stage:

- Equipment.status automatically changes to "Scrapped"
- Equipment is filtered out of active equipment lists
- Visual indicator on equipment list

### ✅ Stage Transition Logic

- **New Request → In Progress**: Sets `startDate`
- **Any → Repaired**: Sets `completionDate`
- **Any → Scrap**: Sets `completionDate` + marks equipment as scrapped

### ✅ Calendar Integration

- Only shows Preventive maintenance requests
- Clicking a date creates a request with that scheduled date pre-filled
- Type automatically set to "Preventive"

## 🚀 Tech Stack Summary

**Frontend:**

- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.3.6
- Framer Motion 10.16.16
- @hello-pangea/dnd 16.5.0
- @tremor/react 3.13.2
- Lucide React 0.294.0
- React Router DOM 6.20.0
- React Big Calendar 1.8.5
- Axios 1.6.2
- date-fns 2.30.0

**Backend:**

- Node.js + Express 4.18.2
- CORS enabled
- In-memory database with seed data
- RESTful API

## 📋 User Workflows

### Workflow 1: The Breakdown (Corrective Maintenance)

1. Equipment breaks down
2. User clicks "+ New Request" in navbar
3. Selects broken equipment → team and technician auto-fill
4. Fills subject (e.g., "Leaking Oil") and description
5. Priority set based on severity
6. Submit → Request appears in Kanban "New Request" column
7. Technician drags to "In Progress" → startDate recorded
8. After repair, drag to "Repaired" → completionDate recorded

### Workflow 2: Preventive Maintenance

1. Manager opens Calendar view
2. Clicks on future date
3. Form opens with type="Preventive" and date pre-filled
4. Selects equipment, fills details
5. Submit → Appears on calendar on scheduled date
6. On scheduled date, technician sees it on calendar
7. Moves through Kanban stages as work progresses

### Workflow 3: Equipment Tracking

1. Navigate to Equipment list
2. Search or filter by department
3. Click equipment card → View details
4. See all equipment info + health status
5. Click "Maintenance" smart button → See all related requests
6. Critical health alert if < 30%

### Workflow 4: Team Management

1. Navigate to Teams
2. Click "+ Add Team"
3. Enter team name and specialization
4. Add members one by one (name + role)
5. Submit → Team available for equipment assignment
6. When creating equipment, select this team → members appear in technician dropdown

## 🎯 Meeting All Requirements

✅ **Equipment Tracking**: By department, by employee, with dedicated team and technician
✅ **Maintenance Teams**: Multiple teams with members, linked to equipment
✅ **Request Types**: Corrective (breakdown) and Preventive (scheduled)
✅ **Auto-Fill Logic**: Equipment selection populates team and technician
✅ **Kanban Board**: 4 stages with drag-drop and visual indicators
✅ **Calendar View**: Preventive requests displayed, click-to-create
✅ **Smart Buttons**: Equipment maintenance button with request count badge
✅ **Scrap Logic**: Request stage "Scrap" marks equipment as scrapped
✅ **Animations**: Framer Motion throughout for smooth UX
✅ **Search/Filter**: Equipment by name, serial, or department
✅ **Responsive Design**: Tailwind CSS with mobile-friendly layouts

## 🎨 Screenshots Reference

All UI matches the Excalidraw mockup with enhanced animations and professional styling.
