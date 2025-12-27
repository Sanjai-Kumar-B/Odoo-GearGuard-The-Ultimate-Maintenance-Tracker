# Project Structure

```
GearGuard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── RecentRequests.jsx
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── Kanban/
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   ├── KanbanColumn.jsx
│   │   │   │   └── RequestCard.jsx
│   │   │   ├── Equipment/
│   │   │   │   ├── EquipmentList.jsx
│   │   │   │   ├── EquipmentForm.jsx
│   │   │   │   └── EquipmentDetail.jsx
│   │   │   ├── Teams/
│   │   │   │   ├── TeamList.jsx
│   │   │   │   └── TeamForm.jsx
│   │   │   ├── Requests/
│   │   │   │   ├── RequestForm.jsx
│   │   │   │   └── RequestDetail.jsx
│   │   │   ├── Calendar/
│   │   │   │   └── MaintenanceCalendar.jsx
│   │   │   └── Layout/
│   │   │       ├── Navbar.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── hooks/
│   │   │   ├── useEquipment.js
│   │   │   ├── useTeams.js
│   │   │   └── useRequests.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Equipment.js
│   │   ├── Team.js
│   │   └── Request.js
│   ├── routes/
│   │   ├── equipment.js
│   │   ├── teams.js
│   │   └── requests.js
│   ├── controllers/
│   │   ├── equipmentController.js
│   │   ├── teamController.js
│   │   └── requestController.js
│   ├── middleware/
│   │   └── validation.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
│
└── README.md
```
