# GearGuard - Quick Start Guide

## Starting the Application

### Option 1: Using Startup Scripts (Easiest)

**Windows Batch File:**
```bash
start-dev.bat
```

**PowerShell Script:**
```powershell
.\start-dev.ps1
```

Both servers will open in separate terminal windows.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Accessing the Application

- **Frontend**: http://localhost:3000 (or next available port: 3001, 3002, etc.)
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api

## First Time Setup

1. **Install Dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

2. **Seed Database (Optional):**
   ```bash
   cd backend
   npm run seed
   ```
   This creates sample equipment, teams, and maintenance requests.

3. **Start Application:**
   Use one of the startup methods above.

## Default Login

The application uses mock authentication. You can:
- **Sign up** with any email and company name
- **Login** with any email (password minimum 6 characters)

## Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS + Framer Motion
- **Backend**: Node.js + Express + MongoDB
- **State Management**: Context API
- **Drag & Drop**: @hello-pangea/dnd

## Project Structure

```
GearGuard/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── config/          # Database configuration
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # State management
│   │   ├── pages/       # Auth pages
│   │   └── App.jsx      # Main app
│   └── index.html
└── start-dev.*          # Startup scripts
```

## Troubleshooting

### Backend won't start
- Ensure MongoDB service is running
- Check port 5000 isn't in use: `netstat -ano | findstr :5000`
- Kill process if needed: `taskkill /PID [PID] /F`

### Frontend shows blank page
- Verify backend is running on port 5000
- Check browser console for errors (F12)
- Ensure you're on the correct port (check Vite output)

### CORS Errors
Backend is configured for ports 3000, 3001, 3002. If using different port:
- Edit `backend/server.js` allowedOrigins array
- Restart backend server

## Features

- ✅ Dashboard with real-time statistics
- ✅ Equipment management with health tracking
- ✅ Kanban board for maintenance workflows (drag & drop)
- ✅ Calendar view for scheduled maintenance
- ✅ Team management
- ✅ Overdue request highlighting
- ✅ MongoDB persistence
- ✅ Responsive design
