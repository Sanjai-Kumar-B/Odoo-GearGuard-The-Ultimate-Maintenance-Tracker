# GearGuard: 8-Hour Hackathon Battle Plan 🚀

## Team Division (3 Members)

### 👤 Sanjai Kumar: Frontend Lead (Dashboard & UI)

- Dashboard with stat cards
- Kanban board view
- Navigation & layout

### 👤 Navanidhiram: Backend Lead (API & Logic)

- Database models
- REST API endpoints
- Business logic & automation

### 👤 Abee: Full Stack (Forms & Integration)

- Equipment forms
- Request creation forms
- Calendar view
- Team management

---

## ⏰ Timeline Breakdown (8 Hours)

### Hour 0-1: Setup & Foundation (ALL MEMBERS)

- [ ] Choose tech stack (Recommended: React + Node.js + MongoDB/JSON)
- [ ] Initialize project structure
- [ ] Set up Git workflow
- [ ] Create data models

### Hour 1-3: Core Development (PARALLEL WORK)

**Member 1:**

- [ ] Dashboard layout & navigation
- [ ] Stat cards (Critical Equipment, Technician Load, Open Requests)
- [ ] Recent requests table

**Member 2:**

- [ ] Equipment model & API
- [ ] Maintenance Team model & API
- [ ] Request model & API
- [ ] Auto-fill logic

**Member 3:**

- [ ] Equipment form with validation
- [ ] Team creation form
- [ ] Request creation form

### Hour 3-5: Advanced Features (PARALLEL WORK)

**Member 1:**

- [ ] Kanban board with drag-and-drop
- [ ] Stage transitions (New → In Progress → Repaired)
- [ ] Visual indicators (overdue, technician avatars)

**Member 2:**

- [ ] Smart button logic (Equipment → Requests count)
- [ ] Date-based filtering
- [ ] Search & group by functionality

**Member 3:**

- [ ] Calendar view for preventive maintenance
- [ ] Date picker integration
- [ ] Request assignment logic

### Hour 5-6.5: Integration & Polish (ALL MEMBERS)

- [ ] Connect frontend to backend
- [ ] Test all workflows (Breakdown & Routine Checkup)
- [ ] Bug fixes
- [ ] Responsive design tweaks

### Hour 6.5-7.5: Demo Preparation

- [ ] Seed demo data
- [ ] Test complete user journey
- [ ] Prepare presentation
- [ ] Create demo script

### Hour 7.5-8: Buffer & Final Touches

- [ ] Last-minute fixes
- [ ] Polish UI
- [ ] Deploy (optional: Vercel/Netlify + Railway/Render)

---

## 🎯 MVP Features (Must Have)

1. ✅ Dashboard with 3 stat cards
2. ✅ Equipment list & create form
3. ✅ Team list & create form
4. ✅ Request creation with auto-fill
5. ✅ Kanban board (4 stages)
6. ✅ Request assignment
7. ✅ Smart button on Equipment

## 🌟 Nice-to-Have (If Time Permits)

- Calendar view
- Search & filters
- Overdue highlighting
- Scrap logic
- Pivot reports

---

## 📊 Success Metrics

- [ ] Can create equipment
- [ ] Can create teams with members
- [ ] Can create corrective request (auto-fills team)
- [ ] Can drag request through Kanban stages
- [ ] Smart button shows request count
- [ ] Dashboard displays live stats

---

## 🛠️ Recommended Tech Stack

**Frontend:** React + Tailwind CSS + DND Kit (drag-drop)
**Backend:** Node.js + Express + MongoDB (or JSON file for quick MVP)
**State:** React Context or Zustand
**Calendar:** react-big-calendar

**Quick Alternative:** Next.js (combines frontend + backend)
