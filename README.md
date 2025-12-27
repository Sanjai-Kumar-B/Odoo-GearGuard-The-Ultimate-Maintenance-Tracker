# GearGuard: The Ultimate Maintenance Tracker

<div align="center">

![GearGuard Logo](https://via.placeholder.com/150)

**Track Equipment. Manage Maintenance. Maximize Uptime.**

[� Production Setup](./PRODUCTION_READY.md) · [📖 Quick Start](./START_HERE.md) · [📋 Cheatsheet](./TEAM_CHEATSHEET.md)

</div>

---

## 🎉 PRODUCTION READY!

### 👉 [PRODUCTION_READY.md - Full Setup Guide](./PRODUCTION_READY.md) ⭐

This project is now **production-ready** with:

- ✅ **MongoDB Database** - Persistent data storage
- ✅ **All UI Elements Working** - Every button is clickable
- ✅ **Auto-Fill Logic** - Smart request creation
- ✅ **Stage Transitions** - Automatic date tracking
- ✅ **Error Handling** - Production-grade middleware
- ✅ **Data Validation** - Schema enforcement

### 📚 Documentation:

- **[PRODUCTION_READY.md](./PRODUCTION_READY.md)** - Production setup & features ⭐⭐⭐
- **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** - Database installation guide
- **[START_HERE.md](./START_HERE.md)** - Development quick start
- **[TEAM_CHEATSHEET.md](./TEAM_CHEATSHEET.md)** - Quick reference
- **[CODE_SNIPPETS.md](./CODE_SNIPPETS.md)** - Code library

---

## 🎯 About The Project

GearGuard is a **production-grade maintenance management system** for tracking industrial equipment and managing maintenance workflows. Built with React, Node.js, and MongoDB.

### ✨ Features

- 📊 **Real-time Dashboard** - Live statistics with MongoDB aggregation
- 🗂️ **MongoDB Database** - Persistent storage with proper indexing
- 🎯 **Kanban Workflow** - Drag-and-drop with auto-save to database
- 🤖 **Smart Auto-Fill** - Equipment data auto-populates requests
- 📈 **Team Workload** - Real-time active request counters
- 📅 **Calendar View** - Preventive maintenance scheduling
- 🔧 **Stage Transitions** - Automatic date tracking and equipment status updates

---

## 🚀 Quick Start (Production)

### Prerequisites

- Node.js 16+
- MongoDB 7.0+ (or MongoDB Atlas account)

- Node.js 18+
- npm or yarn

### Installation

**Option 1: Automated Setup (Windows)**

```bash
# Run setup script
setup-production.bat
```

**Option 2: Manual Setup**

1. **Install MongoDB**
   - Local: https://www.mongodb.com/try/download/community
   - Cloud: https://www.mongodb.com/cloud/atlas (FREE tier)

2. **Install dependencies & seed database**

```bash
# Backend
cd backend
npm install
npm run seed

# Frontend (new terminal)
cd frontend
npm install
```

3. **Start servers**

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

4. **Open your browser**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/health

---

## 🏗️ Tech Stack

**Frontend:**

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion (animations)
- @hello-pangea/dnd (drag & drop)
- @tremor/react (charts)
- Lucide React (icons)

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- dotenv (environment management)

**Database:**

- MongoDB with 3 collections: Equipment, Teams, Requests
- Unique indexes on critical fields
- Auto-incrementing counters
- Referential integrity
- Tailwind CSS
- DND Kit (Drag & Drop)
- React Router
- Axios

**Backend:**

- Node.js
- Express
- In-memory database (easily upgradeable to MongoDB)

---

## 📸 Screenshots

### Dashboard

![Dashboard](https://via.placeholder.com/800x400)

### Kanban Board

![Kanban](https://via.placeholder.com/800x400)

---

## 🎮 Usage

### Creating a Maintenance Request

1. Navigate to Dashboard
2. Click "New" button
3. Select equipment from dropdown
4. Team and technician auto-populate ✨
5. Add description and priority
6. Submit request

### Managing Requests (Kanban)

1. Go to Maintenance tab
2. View requests organized by stage
3. Drag cards between columns:
   - **New Request** → **In Progress** → **Repaired** → **Scrap**
4. Status updates automatically

### Viewing Equipment Maintenance History

1. Go to Equipment page
2. Click on any equipment
3. Click "Maintenance" smart button
4. See all related requests with count badge

---

## 📋 Project Structure

```
gearguard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── Kanban/
│   │   │   ├── Equipment/
│   │   │   ├── Teams/
│   │   │   └── Requests/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── dashboard.js
│   │   ├── equipment.js
│   │   ├── teams.js
│   │   └── requests.js
│   ├── config/
│   │   └── db.js
│   └── server.js
├── HACKATHON_PLAN.md
├── QUICK_START.md
└── README.md
```

---

## 🛣️ Roadmap

- [x] Dashboard with real-time stats
- [x] Kanban board with drag-and-drop
- [x] Equipment management
- [x] Team management
- [x] Auto-fill logic
- [ ] Calendar view for preventive maintenance
- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Mobile app

---

## 🤝 Contributing

Contributions are welcome! This project was built during a hackathon but is open for improvements.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👏 Acknowledgments

- Built with ❤️ during Odoo Hackathon 2025
- Team Members: **Sanjai Kumar**, **Navanidhiram**, **Abee**
- Inspired by modern maintenance management needs

---

## 📞 Contact

**Team GearGuard:**
- Sanjai Kumar - [GitHub](https://github.com/Sanjai-Kumar-B)
- Navanidhiram
- Abee

Project Link: [https://github.com/Sanjai-Kumar-B/Odoo-GearGuard-The-Ultimate-Maintenance-Tracker](https://github.com/Sanjai-Kumar-B/Odoo-GearGuard-The-Ultimate-Maintenance-Tracker)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ☕ and 💻 by **Sanjai Kumar, Navanidhiram & Abee**

</div>
