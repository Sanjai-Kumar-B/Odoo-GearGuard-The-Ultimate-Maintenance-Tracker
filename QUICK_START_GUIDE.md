# GearGuard - Quick Start Guide

## 🚀 Running the Application

### Prerequisites

- Node.js installed
- Both terminals ready (frontend & backend)

### Start Backend (Port 5000)

```bash
cd backend
npm start
```

✅ Backend running at: http://localhost:5000

### Start Frontend (Port 3000)

```bash
cd frontend
npm run dev
```

✅ Frontend running at: http://localhost:3000

## 📍 Navigation Map

| Page                 | URL                   | Description                                      |
| -------------------- | --------------------- | ------------------------------------------------ |
| **Dashboard**        | `/`                   | Overview with stats, charts, and recent requests |
| **Kanban Board**     | `/kanban`             | Drag-drop workflow for requests                  |
| **Equipment List**   | `/equipment`          | Browse and search all equipment                  |
| **Equipment Detail** | `/equipment/:id`      | View equipment with smart maintenance button     |
| **Add Equipment**    | `/equipment/new`      | Create new equipment                             |
| **Edit Equipment**   | `/equipment/edit/:id` | Modify equipment                                 |
| **New Request**      | `/requests/new`       | Create maintenance request with auto-fill        |
| **Edit Request**     | `/requests/edit/:id`  | Modify request                                   |
| **Teams**            | `/teams`              | View all maintenance teams                       |
| **Add Team**         | `/teams/new`          | Create new team                                  |
| **Calendar**         | `/calendar`           | Preventive maintenance scheduler                 |

## 🎯 Demo Workflow (8-Hour Hackathon Strategy)

### Hour 0-1: Setup & Verification

1. ✅ Open http://localhost:3000
2. ✅ Verify Dashboard loads with seed data
3. ✅ Check Kanban board shows 1 request
4. ✅ Navigate through all pages

### Hour 1-2: Member 1 - Dashboard & Data

**Tasks:**

- Add more equipment via Equipment page
- Create 2-3 teams via Teams page
- Add team members to each team
- Test auto-fill by creating requests

**Expected Result:**

- Dashboard shows updated stats
- Charts reflect new data
- Equipment list populated

### Hour 2-4: Member 2 - Kanban Workflow

**Tasks:**

- Create 5-10 requests via "+ New Request" button
- Mix of Corrective and Preventive types
- Drag requests through Kanban stages:
  - New Request → In Progress (watch startDate set)
  - In Progress → Repaired (watch completionDate set)
  - Test Scrap stage (watch equipment status change)
- Verify smart button on equipment detail page

**Expected Result:**

- Smooth drag-drop
- Stage transitions working
- Request counts updating
- Equipment status changing on Scrap

### Hour 4-6: Member 3 - Calendar & Preventive

**Tasks:**

- Open Calendar view
- Click future dates to create Preventive requests
- Schedule 5-7 preventive maintenance tasks
- Verify they appear on calendar
- Test clicking events to edit

**Expected Result:**

- Calendar shows all preventive requests
- Color coding working (blue, orange, green, red)
- Date-based scheduling functional

### Hour 6-7: Team - Testing & Polish

**All members test:**

1. Search/filter equipment by department
2. View equipment details → click Maintenance button
3. Verify request count badge
4. Test edit flows for equipment/teams/requests
5. Check responsive design on different screen sizes
6. Verify all animations working

### Hour 7-8: Demo Prep

1. Reset to clean state or add realistic demo data
2. Prepare demo script:
   - Show Dashboard overview
   - Create new request with auto-fill
   - Drag through Kanban stages
   - Show equipment smart button
   - Display calendar view
3. Practice 5-minute demo

## 🎨 Key Features to Showcase

### 1. **Auto-Fill Magic**

```
Demo:
1. Click "+ New Request"
2. Select Equipment → Watch team and technician auto-populate
3. Fill subject and submit
```

### 2. **Smart Button**

```
Demo:
1. Go to Equipment list
2. Click any equipment
3. Show "Maintenance" button with badge count
4. Toggle to reveal all related requests
```

### 3. **Drag-Drop Workflow**

```
Demo:
1. Open Kanban Board
2. Drag a request from "New Request" to "In Progress"
3. Show that startDate is auto-set
4. Drag to "Repaired" → completionDate set
```

### 4. **Scrap Logic**

```
Demo:
1. Take a request to "Scrap" stage
2. Go to Equipment list
3. Show that equipment status changed to "Scrapped"
```

### 5. **Calendar Scheduling**

```
Demo:
1. Open Calendar
2. Click a future date
3. Form opens with Preventive type pre-selected
4. Create request → appears on calendar
```

## 🐛 Common Issues & Fixes

### Frontend Not Loading

```bash
# Clear cache and restart
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Backend Not Responding

```bash
# Check port 5000 is free
cd backend
npm start
```

### Missing Dependencies

```bash
# Frontend
cd frontend
npm install framer-motion @hello-pangea/dnd @tremor/react lucide-react react-big-calendar date-fns

# Backend (already installed)
cd backend
npm install
```

## 📊 Seed Data Overview

**Equipment (2 items):**

- CNC Machine #1001 (Production, Health 85%, Active)
- Forklift FL-205 (Warehouse, Health 45%, Active)

**Teams (2 teams):**

- Mechanics (John Doe, Jane Smith)
- IT Support (Bob Wilson)

**Requests (1 request):**

- Oil Change for CNC Machine (New Request, High priority)

## 🎯 Judging Criteria Alignment

| Criteria            | Implementation                                                       |
| ------------------- | -------------------------------------------------------------------- |
| **Functionality**   | All core features working: CRUD, auto-fill, drag-drop, smart buttons |
| **User Experience** | Smooth animations, intuitive navigation, responsive design           |
| **Code Quality**    | Clean component structure, RESTful API, error handling               |
| **Innovation**      | Auto-fill logic, smart buttons, integrated calendar, scrap workflow  |
| **Design**          | Modern Tailwind UI, Tremor charts, Framer Motion animations          |

## 🔥 Pro Tips

1. **Keep Backend Running**: Don't restart backend during demo to avoid data loss
2. **Use Chrome DevTools**: Open Network tab to show API calls during auto-fill
3. **Mobile Demo**: Show responsive design on phone/tablet simulation
4. **Animation Highlight**: Hover over technician avatars to show rotation
5. **Real-Time Updates**: Drag requests in Kanban while showing Equipment detail page with request count

## ✅ Final Checklist

- [ ] Both servers running (frontend:3000, backend:5000)
- [ ] All pages accessible via navbar
- [ ] Dashboard shows charts and stats
- [ ] Kanban drag-drop working
- [ ] Equipment list searchable and filterable
- [ ] Equipment detail shows smart button
- [ ] Request form auto-fills team/technician
- [ ] Calendar displays preventive requests
- [ ] Teams page shows all teams
- [ ] All animations smooth
- [ ] No console errors
- [ ] Responsive on mobile

## 🏆 Ready to Demo!

Your GearGuard system is complete with all features from the mockup plus enhanced animations and user experience. Good luck with your hackathon! 🚀
