# ✅ HACKATHON EXECUTION CHECKLIST

Print this out or keep it visible!

---

## 🚀 SETUP PHASE (Hour 0-1)

### Everyone:

- [ ] Project folder opened in VS Code
- [ ] 2 terminals opened (backend + frontend)
- [ ] Backend running (`npm start` in backend/)
- [ ] Frontend running (`npm run dev` in frontend/)
- [ ] Browser open at http://localhost:3000
- [ ] Dashboard visible without errors
- [ ] Team roles assigned

### Member 1 (Frontend Lead):

- [ ] Can navigate between Dashboard and Kanban
- [ ] Dashboard stat cards showing data
- [ ] Recent requests table populated
- [ ] Kanban board drag-drop tested

### Member 2 (Backend Lead):

- [ ] All API endpoints tested
- [ ] GET /api/dashboard returns data
- [ ] GET /api/equipment returns equipment list
- [ ] Seed data reviewed and understood
- [ ] Added 5+ more equipment items

### Member 3 (Forms):

- [ ] EquipmentForm.jsx created
- [ ] Basic form structure working
- [ ] Can submit to API
- [ ] Form validation added

---

## 📝 CORE FEATURES (Hour 1-3)

### Equipment Management:

- [ ] Equipment list page created
- [ ] Can view all equipment
- [ ] Equipment form complete (create)
- [ ] Equipment form complete (edit)
- [ ] Can delete equipment
- [ ] Form validation working
- [ ] Success message shows after create

### Request Management:

- [ ] Request form created
- [ ] Equipment dropdown populated from API
- [ ] **Auto-fill**: Team fills when equipment selected ⭐
- [ ] **Auto-fill**: Technician fills when equipment selected ⭐
- [ ] Can set request type (Corrective/Preventive)
- [ ] Can set priority
- [ ] Can set scheduled date
- [ ] Form submits successfully
- [ ] New request appears in Kanban

### Team Management:

- [ ] Team list page created
- [ ] Team form created
- [ ] Can add team members
- [ ] Team utilization calculated

---

## 🎯 ADVANCED FEATURES (Hour 3-5)

### Smart Button:

- [ ] Equipment detail page created
- [ ] "Maintenance" button added
- [ ] Button shows request count badge
- [ ] Clicking opens filtered request list
- [ ] Count updates when requests change

### Kanban Enhancements:

- [ ] Filter by team dropdown
- [ ] Filter by priority
- [ ] Search requests by name
- [ ] Overdue requests highlighted in red
- [ ] Stage transition animations smooth
- [ ] Can assign technician from Kanban card

### Navigation:

- [ ] All pages accessible from nav bar
- [ ] Active page highlighted
- [ ] "New" button opens correct form modal
- [ ] Breadcrumbs working (optional)

### Search & Filter:

- [ ] Global search bar works
- [ ] Can search equipment by name
- [ ] Can search requests by subject
- [ ] Can filter by department
- [ ] Can filter by category

---

## 🎨 UI/UX POLISH (Hour 5-6)

### Visual Design:

- [ ] Color scheme consistent
- [ ] Stat cards have proper colors
- [ ] Buttons have hover effects
- [ ] Forms have proper spacing
- [ ] Mobile responsive (at least tablet)
- [ ] Loading spinners added
- [ ] Error messages styled

### User Experience:

- [ ] Form errors show helpful messages
- [ ] Success toasts appear on actions
- [ ] Confirm dialogs before delete
- [ ] Empty states designed (no data)
- [ ] Tooltips on important buttons
- [ ] Keyboard shortcuts work (Esc to close modals)

---

## 🧪 TESTING PHASE (Hour 6-7)

### Workflow 1: Breakdown Request

- [ ] Navigate to Dashboard
- [ ] Click "New" → Create Request
- [ ] Select Equipment: "CNC Machine 01"
- [ ] Verify team auto-fills: "Mechanics"
- [ ] Verify technician auto-fills: "Alex Foster"
- [ ] Submit request
- [ ] Request appears in Dashboard table
- [ ] Go to Kanban
- [ ] See request in "New Request" column
- [ ] Drag to "In Progress"
- [ ] Verify stage updates
- [ ] Drag to "Repaired"
- [ ] Verify completion date set

### Workflow 2: Preventive Maintenance

- [ ] Create request with type "Preventive"
- [ ] Set scheduled date (future)
- [ ] Request appears on calendar (if built)
- [ ] Can drag on Kanban
- [ ] Workflow completes successfully

### Workflow 3: Smart Button

- [ ] Go to Equipment List
- [ ] Click on "CNC Machine 01"
- [ ] See Equipment detail page
- [ ] "Maintenance" button visible
- [ ] Button shows count (e.g., "3")
- [ ] Click button
- [ ] See all 3 related requests
- [ ] Requests are correct

### Workflow 4: Team Assignment

- [ ] Create new team "Electricians"
- [ ] Add 2 team members
- [ ] Create equipment assigned to "Electricians"
- [ ] Create request for that equipment
- [ ] Verify "Electricians" team auto-fills
- [ ] Workflow completes

### Edge Cases:

- [ ] Creating equipment without all fields
- [ ] Creating request without equipment
- [ ] Dragging request to same stage (no-op)
- [ ] Deleting equipment with requests
- [ ] API server offline (error handling)

---

## 🎬 DEMO PREPARATION (Hour 7-8)

### Demo Data:

- [ ] At least 10 equipment items
- [ ] At least 3 teams
- [ ] At least 15 requests
- [ ] Some requests overdue (scheduled date in past)
- [ ] Some critical equipment (health < 30%)
- [ ] Requests in all 4 stages

### Presentation:

- [ ] Demo script written (4 minutes)
- [ ] Practiced demo 2-3 times
- [ ] Screenshots taken
- [ ] Video recording made (backup)
- [ ] Slides prepared (optional)

### GitHub:

- [ ] All code committed
- [ ] README.md updated with screenshots
- [ ] .gitignore correct (no node_modules)
- [ ] Repository public
- [ ] Clear installation instructions

### Final Checks:

- [ ] No console errors
- [ ] No broken links
- [ ] All buttons work
- [ ] Forms validate
- [ ] API returns correct data
- [ ] Mobile view acceptable

---

## 🏆 BONUS FEATURES (If Time)

- [ ] Calendar view working
- [ ] Export to PDF
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] Advanced charts/graphs
- [ ] Keyboard shortcuts
- [ ] Bulk actions
- [ ] Print view

---

## 📊 SUBMISSION CHECKLIST

- [ ] GitHub repository updated
- [ ] README has project description
- [ ] README has installation steps
- [ ] README has screenshots
- [ ] Live demo deployed (Vercel/Netlify - optional)
- [ ] Presentation slides uploaded
- [ ] Demo video uploaded (if required)
- [ ] Team members listed
- [ ] License file added
- [ ] All commits have good messages

---

## 🎯 PRE-DEMO CHECKLIST (5 Minutes Before)

- [ ] Backend server running
- [ ] Frontend server running
- [ ] Browser tabs ready
- [ ] Demo data loaded
- [ ] Console cleared (no errors)
- [ ] Network tab cleared
- [ ] Zoom screen share tested
- [ ] Audio tested
- [ ] Timer set (4 minutes)
- [ ] Water nearby
- [ ] Deep breath taken 😊

---

## 💪 CONFIDENCE CHECKLIST

Mark these when you're confident:

- [ ] I can create equipment
- [ ] I can create a request
- [ ] Auto-fill works perfectly
- [ ] Kanban drag-drop is smooth
- [ ] Smart button shows correct count
- [ ] Dashboard stats are accurate
- [ ] Search/filter works
- [ ] I can demo this confidently
- [ ] My team knows their parts
- [ ] We're ready to win! 🏆

---

## 🚨 EMERGENCY BACKUP PLAN

If something breaks right before demo:

### Plan A: Fix it

- [ ] Check console for errors
- [ ] Restart servers
- [ ] Clear browser cache
- [ ] Try different browser

### Plan B: Have screenshots

- [ ] Screenshots of working features
- [ ] Video recording of previous test
- [ ] Can explain what it does

### Plan C: Demo what works

- [ ] Focus on working features
- [ ] Skip broken parts
- [ ] Explain vision for broken parts

---

## ⏰ HOURLY CHECK-IN

### After Hour 1:

- Backend & Frontend running? YES / NO
- Dashboard working? YES / NO
- On track? YES / NO

### After Hour 3:

- Equipment form done? YES / NO
- Request form done? YES / NO
- Auto-fill working? YES / NO
- On track? YES / NO

### After Hour 5:

- Smart button working? YES / NO
- All workflows tested? YES / NO
- On track? YES / NO

### After Hour 7:

- Demo practiced? YES / NO
- GitHub updated? YES / NO
- Ready to present? YES / NO

---

**REMEMBER:**

✅ Done is better than perfect
✅ MVP first, extras later
✅ Test as you build
✅ Ask for help when stuck
✅ Stay hydrated
✅ Have fun!

**YOU GOT THIS! 🚀**
