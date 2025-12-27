# 🚨 START HERE - First 30 Minutes

## Team Setup (5 minutes)

1. **Everyone:** Open this project in VS Code
2. **Everyone:** Open 2 terminals each (one for frontend, one for backend)
3. **Team Members:**
   - **Sanjai Kumar:** Frontend Lead (Dashboard polish + Kanban)
   - **Navanidhiram:** Backend Lead (API testing + Smart features)
   - **Abee:** Forms & Integration (Equipment + Request forms)

---

## Immediate Tasks (Next 25 minutes)

### 🎯 ALL MEMBERS DO THIS FIRST:

#### Terminal 1: Start Backend

```powershell
cd backend
npm install
npm start
```

✅ Should see: "GearGuard server running on http://localhost:5000"

#### Terminal 2: Start Frontend

```powershell
cd frontend
npm install
npm run dev
```

✅ Should see: "Local: http://localhost:3000"

#### Test in Browser

1. Open: http://localhost:3000
2. You should see the Dashboard!
3. Check the 3 stat cards are showing
4. Check the recent requests table

---

## ⚡ Critical Files to Edit First

### Member 1: Dashboard Navigation (15 min)

**File:** `frontend/src/components/Dashboard/Dashboard.jsx` (line 60-70)

**Task:** Make the navigation buttons actually work

```javascript
// Replace the button section with this:
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Update buttons:
<button onClick={() => navigate('/kanban')} className="...">
  Maintenance
</button>
<button onClick={() => navigate('/')} className="...">
  Dashboard
</button>
```

### Member 2: Test API (10 min)

**Task:** Open Postman or use browser

Test these endpoints:

- GET http://localhost:5000/api/dashboard
- GET http://localhost:5000/api/equipment
- GET http://localhost:5000/api/teams
- GET http://localhost:5000/api/requests

All should return JSON data!

### Member 3: Create Equipment Form (20 min)

**File:** Create `frontend/src/components/Equipment/EquipmentForm.jsx`

```javascript
import React, { useState } from "react";

const EquipmentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    category: "Production Equipment",
    department: "",
    assignedTo: "",
    location: "",
    maintenanceTeam: "Mechanics",
    health: 100,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Equipment</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Equipment Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={(e) =>
            setFormData({ ...formData, serialNumber: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option>Production Equipment</option>
          <option>Computer</option>
          <option>Vehicle</option>
        </select>

        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="border p-2 rounded col-span-2"
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
```

---

## 🎯 Next 30 Minutes (After Setup Works)

### Member 1: Kanban Enhancement

1. Go to `/kanban` route
2. Test drag and drop
3. Add color coding for overdue requests
4. Add filter by team

### Member 2: Smart Button Implementation

**File:** Create `frontend/src/components/Equipment/EquipmentDetail.jsx`

### Member 3: Request Form

**File:** Create `frontend/src/components/Requests/RequestForm.jsx`

- Equipment dropdown (fetch from API)
- Auto-fill team when equipment selected
- Submit button

---

## ✅ Success Checklist (End of Hour 1)

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] Dashboard visible in browser
- [ ] Can navigate between Dashboard and Kanban
- [ ] API endpoints responding
- [ ] Equipment form created (Member 3)
- [ ] All team members understand their tasks

---

## 🆘 Common Issues & Fixes

### "npm install" fails

```powershell
# Clear cache
npm cache clean --force
npm install
```

### Port already in use

```powershell
# Windows: Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS error

- Check backend is running
- Check `vite.config.js` has proxy configured

### Module not found

```powershell
cd frontend
npm install <missing-module>
```

---

## 📞 Quick Reference

**Backend API Base:** http://localhost:5000/api
**Frontend:** http://localhost:3000

**Key Files:**

- Dashboard: `frontend/src/components/Dashboard/Dashboard.jsx`
- Kanban: `frontend/src/components/Kanban/KanbanBoard.jsx`
- Backend Routes: `backend/routes/*.js`
- Database: `backend/config/db.js` (in-memory data)

---

## 🎨 Color Codes (For UI Consistency)

- **Critical/Error:** Red (#EF4444)
- **Warning/Pending:** Yellow (#F59E0B)
- **Info/In Progress:** Blue (#3B82F6)
- **Success/Completed:** Green (#10B981)

---

## 💪 Motivation

You have **8 hours** to build something amazing!

**Hour 0-1:** Setup & Dashboard ← YOU ARE HERE
**Hour 1-3:** Core features (Forms, Kanban)
**Hour 3-5:** Advanced features (Calendar, Smart buttons)
**Hour 5-6:** Integration & Testing
**Hour 6-8:** Demo prep & Polish

**YOU GOT THIS! 🚀**
