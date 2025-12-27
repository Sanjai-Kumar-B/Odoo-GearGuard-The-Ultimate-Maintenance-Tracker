# 🎯 TEAM CHEATSHEET - Quick Reference

## 🚀 Start Commands (Copy-Paste)

### PowerShell Terminal 1 (Backend):

```powershell
cd C:\Users\mayan\Downloads\The-Ultimate-Maintenance-Tracker\backend
npm install
npm start
```

### PowerShell Terminal 2 (Frontend):

```powershell
cd C:\Users\mayan\Downloads\The-Ultimate-Maintenance-Tracker\frontend
npm install
npm run dev
```

---

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000/health

---

## 📂 Key Files to Edit

### Member 1 (Dashboard/Kanban):

- `frontend/src/components/Dashboard/Dashboard.jsx` - Main dashboard
- `frontend/src/components/Kanban/KanbanBoard.jsx` - Kanban board
- `frontend/src/App.jsx` - Routing

### Member 2 (Backend/API):

- `backend/routes/equipment.js` - Equipment endpoints
- `backend/routes/requests.js` - Request endpoints
- `backend/config/db.js` - Add more seed data

### Member 3 (Forms):

- Create: `frontend/src/components/Equipment/EquipmentForm.jsx`
- Create: `frontend/src/components/Requests/RequestForm.jsx`
- Create: `frontend/src/components/Teams/TeamForm.jsx`

---

## 🔌 API Endpoints

| Method | Endpoint             | Purpose                      |
| ------ | -------------------- | ---------------------------- |
| GET    | `/api/dashboard`     | Get stats + recent requests  |
| GET    | `/api/equipment`     | List equipment               |
| POST   | `/api/equipment`     | Create equipment             |
| GET    | `/api/equipment/:id` | Get equipment details        |
| GET    | `/api/teams`         | List teams                   |
| POST   | `/api/teams`         | Create team                  |
| GET    | `/api/requests`      | List requests                |
| POST   | `/api/requests`      | Create request (auto-fills!) |
| PUT    | `/api/requests/:id`  | Update request               |

---

## 🎨 Common Commands

### Install a package:

```bash
cd frontend
npm install package-name
```

### Fix issues:

```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules
npm install
```

### Git commands:

```bash
git add .
git commit -m "Added equipment form"
git push
```

---

## 📖 Documentation Files

| File                | Purpose                            |
| ------------------- | ---------------------------------- |
| `START_HERE.md`     | **START HERE!** First 30 min guide |
| `SETUP_SUMMARY.md`  | Complete project overview          |
| `HACKATHON_PLAN.md` | 8-hour timeline                    |
| `QUICK_START.md`    | Detailed setup instructions        |
| `CODE_SNIPPETS.md`  | Copy-paste code library            |
| `data-models.md`    | Database schema                    |

---

## 🎯 Priority Tasks (In Order)

### Hour 0-1: Setup

- [x] Backend running ✅
- [x] Frontend running ✅
- [ ] Dashboard loads
- [ ] Navigation works

### Hour 1-2: Forms

- [ ] Equipment form (Member 3)
- [ ] Request form (Member 3)
- [ ] Test API calls (Member 2)

### Hour 2-3: Integration

- [ ] Create equipment works
- [ ] Create request works
- [ ] Auto-fill works

### Hour 3-4: Kanban

- [ ] Drag-drop tested
- [ ] Stage updates work
- [ ] Filters added

### Hour 4-5: Smart Features

- [ ] Smart button
- [ ] Equipment detail page
- [ ] Search functionality

### Hour 5-6: Polish

- [ ] Bug fixes
- [ ] UI improvements
- [ ] Responsive design

### Hour 6-7: Testing

- [ ] Full workflow test
- [ ] Demo data ready
- [ ] Screenshots taken

### Hour 7-8: Demo Prep

- [ ] Presentation ready
- [ ] Demo script practiced
- [ ] GitHub updated

---

## 🐛 Troubleshooting

### "Port already in use"

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (replace XXXX with PID)
taskkill /PID XXXX /F
```

### "Module not found"

```bash
cd frontend
npm install
```

### "CORS error"

- Check backend is running on port 5000
- Check `vite.config.js` has proxy

### Frontend won't build

```bash
cd frontend
rm -rf node_modules
npm cache clean --force
npm install
npm run dev
```

---

## 💡 Quick Tips

1. **Save often** - Ctrl+S after every change
2. **Check console** - F12 → Console tab for errors
3. **Test immediately** - Don't write lots of code without testing
4. **Ask teammates** - Don't stay stuck > 10 minutes
5. **Commit often** - `git commit` every 30 min

---

## 🎬 Demo Script (4 minutes)

**0:00 - Problem**

- "Equipment downtime costs companies millions"

**0:30 - Dashboard**

- Show critical equipment (5 units < 30%)
- Show technician load (85%)
- Show open requests (12 pending)

**1:30 - Create Request**

- Click "New"
- Select "CNC Machine 01"
- **Auto-fill magic!** Team fills "Mechanics"
- Submit

**2:30 - Kanban**

- Show request in "New"
- Drag to "In Progress"
- Drag to "Repaired"

**3:30 - Smart Button**

- Click equipment
- Show maintenance button with count
- Click to see all requests

**4:00 - Impact**

- "40% less downtime, better resource allocation"

---

## 📞 Team Communication

### Slack/Discord Messages:

```
"Backend ready! Test at http://localhost:5000/api/dashboard"
"Equipment form done! Need someone to test"
"Found bug in Kanban drag-drop, fixing now"
"Demo data updated with 10 equipment items"
```

---

## 🏆 Success Criteria

### Minimum Viable Product:

- [ ] Dashboard shows stats
- [ ] Can create equipment
- [ ] Can create request (auto-fills team)
- [ ] Kanban drag-drop works
- [ ] Smart button shows count

### Impressive Features:

- [ ] Search/filter
- [ ] Calendar view
- [ ] Scrap logic
- [ ] Duration tracking
- [ ] Overdue highlighting

### Wow Factor:

- [ ] Smooth animations
- [ ] Mobile responsive
- [ ] Dark mode
- [ ] Export PDF
- [ ] Email notifications

---

## ⏰ Time Check

Current time: **\_\_\_**

Target completion times:

- Setup complete: +1 hour
- Forms done: +2 hours
- Integration working: +3 hours
- Polish complete: +6 hours
- Demo ready: +7.5 hours
- Submit: 8 hours

**Are you on track? Adjust plan if needed!**

---

## 🎯 Focus Areas by Hour

**Hour 1:** Setup + Dashboard navigation
**Hour 2:** Equipment form + API testing
**Hour 3:** Request form + Auto-fill
**Hour 4:** Kanban polish + Smart button
**Hour 5:** Team management + Calendar
**Hour 6:** Testing + Bug fixes
**Hour 7:** Polish + Demo prep
**Hour 8:** Final touches + Submit

---

## 📱 Quick Contact

**Member 1 (Frontend):** ****\_\_****
**Member 2 (Backend):** ****\_\_****
**Member 3 (Forms):** ****\_\_****

---

**YOU GOT THIS! 🚀**

Remember: Done > Perfect
Ship something that works!
