# GearGuard - Quick Start Guide 🚀

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🎯 30-Second Setup

### Terminal 1: Start Backend

```bash
cd backend
npm install
npm start
```

Backend will run on `http://localhost:5000`

### Terminal 2: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 📂 Project Structure

```
The-Ultimate-Maintenance-Tracker/
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/  ✅ DONE
│   │   │   ├── Kanban/     ✅ DONE
│   │   │   ├── Equipment/  ⏳ TO DO
│   │   │   ├── Teams/      ⏳ TO DO
│   │   │   └── Requests/   ⏳ TO DO
│   └── package.json
├── backend/                # Node.js + Express
│   ├── routes/             ✅ DONE
│   ├── config/             ✅ DONE (In-memory DB)
│   └── server.js           ✅ DONE
└── HACKATHON_PLAN.md      # Your 8-hour roadmap
```

---

## ✅ What's Already Built

### Dashboard (Member 1 can start here)

- [x] 3 stat cards (Critical Equipment, Technician Load, Open Requests)
- [x] Recent requests table
- [x] Navigation header
- [x] Search bar

### Kanban Board (Member 1 can enhance)

- [x] 4-column layout (New, In Progress, Repaired, Scrap)
- [x] Drag & drop functionality
- [x] Request cards with priority colors
- [x] Technician avatars
- [x] Auto-update on stage change

### Backend API (Member 2 - Ready to use!)

- [x] GET /api/dashboard - Dashboard stats
- [x] GET /api/equipment - List all equipment
- [x] POST /api/equipment - Create equipment
- [x] GET /api/teams - List all teams
- [x] POST /api/teams - Create team
- [x] GET /api/requests - List all requests
- [x] POST /api/requests - Create request (auto-fills team!)
- [x] PUT /api/requests/:id - Update request (stage transitions)

---

## 🎨 Available Routes

| Route        | Component      | Status      |
| ------------ | -------------- | ----------- |
| `/`          | Dashboard      | ✅ Working  |
| `/kanban`    | Kanban Board   | ✅ Working  |
| `/equipment` | Equipment List | ⏳ To Build |
| `/teams`     | Teams List     | ⏳ To Build |
| `/calendar`  | Calendar View  | ⏳ To Build |

---

## 🔨 Next Steps (Priority Order)

### Hour 1-2: Member 3 - Equipment & Request Forms

1. Create `EquipmentForm.jsx` - Form to add new equipment
2. Create `RequestForm.jsx` - Form to create requests
3. Test auto-fill: When selecting equipment, team should auto-populate

### Hour 2-3: Member 2 - Smart Button

1. Add "Maintenance" button to Equipment detail page
2. Show count of related requests
3. Click opens filtered request list

### Hour 3-4: Member 3 - Calendar View (Optional)

1. Install: `npm install react-big-calendar`
2. Create `MaintenanceCalendar.jsx`
3. Display preventive maintenance requests

### Hour 4-6: All Members - Integration & Testing

1. Test complete workflows
2. Add demo data
3. Fix bugs
4. Polish UI

---

## 🧪 Testing the App

### Test Workflow 1: Breakdown Request

1. Go to Dashboard
2. Click "New" → Create Request
3. Select Equipment: "CNC Machine 01"
4. Team should auto-fill: "Mechanics"
5. Technician auto-fills: "Alex Foster"
6. Save request
7. Go to `/kanban`
8. See request in "New Request" column
9. Drag to "In Progress"
10. Drag to "Repaired"

### Test Workflow 2: Smart Button

1. Go to Equipment List
2. Click on "CNC Machine 01"
3. See "Maintenance" button with count badge
4. Click button → See all related requests

---

## 💡 Key Features to Demo

1. **Auto-Fill Logic** ✨
   - Select equipment → Team + Technician auto-populate

2. **Drag & Drop Kanban** 🎯
   - Drag cards between stages
   - Automatic status updates

3. **Dashboard Stats** 📊
   - Live count of critical equipment
   - Technician utilization
   - Overdue requests

4. **Smart Button** 🔘
   - Equipment → Maintenance button
   - Shows request count
   - Opens filtered list

---

## 🐛 Troubleshooting

### Backend won't start

```bash
cd backend
npm install
node server.js
```

### Frontend shows errors

```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### CORS errors

- Make sure backend is running on port 5000
- Frontend proxy is configured in `vite.config.js`

---

## 📝 Demo Script (For Presentation)

**Slide 1: Problem**

- Companies struggle to track equipment maintenance
- Requests get lost, equipment breaks down

**Slide 2: Solution - GearGuard**

- Central equipment database
- Smart request management
- Visual Kanban workflow

**Demo 1: Dashboard**

- Show critical equipment alerts
- Show technician load
- Show open requests

**Demo 2: Create Request**

- Select equipment
- Watch auto-fill magic ✨
- Submit request

**Demo 3: Kanban Board**

- Show all requests organized by stage
- Drag card from New → In Progress
- Drag to Repaired

**Demo 4: Smart Features**

- Equipment detail page
- Maintenance button with count
- Click to see all requests

**Slide 3: Impact**

- Reduce downtime
- Better resource allocation
- Data-driven decisions

---

## 🏆 Bonus Features (If Time Permits)

- [ ] Calendar view for preventive maintenance
- [ ] Search & filter on all pages
- [ ] Export reports to PDF
- [ ] Email notifications
- [ ] Mobile responsive (already 80% done with Tailwind!)

---

## 📞 Need Help?

Check these files:

- `HACKATHON_PLAN.md` - Full 8-hour timeline
- `data-models.md` - Database structure
- `project-structure.md` - File organization

Good luck! 🚀
