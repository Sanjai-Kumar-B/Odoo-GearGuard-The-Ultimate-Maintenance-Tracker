import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import KanbanBoard from "./components/Kanban/KanbanBoard";
import EquipmentList from "./components/Equipment/EquipmentList";
import EquipmentForm from "./components/Equipment/EquipmentForm";
import EquipmentDetail from "./components/Equipment/EquipmentDetail";
import RequestForm from "./components/Requests/RequestForm";
import CalendarView from "./components/Calendar/CalendarView";
import TeamList from "./components/Teams/TeamList";
import TeamForm from "./components/Teams/TeamForm";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-100">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/maintenance" element={<KanbanBoard />} />

                      {/* Equipment Routes */}
                      <Route path="/equipment" element={<EquipmentList />} />
                      <Route path="/equipment/new" element={<EquipmentForm />} />
                      <Route path="/equipment/edit/:id" element={<EquipmentForm />} />
                      <Route path="/equipment/:id" element={<EquipmentDetail />} />

                      {/* Maintenance Routes */}
                      <Route path="/maintenance/new" element={<RequestForm />} />
                      <Route path="/maintenance/edit/:id" element={<RequestForm />} />

                      {/* Team Routes */}
                      <Route path="/teams" element={<TeamList />} />
                      <Route path="/teams/new" element={<TeamForm />} />
                      <Route path="/teams/:id" element={<TeamForm />} />

                      {/* Calendar */}
                      <Route path="/calendar" element={<CalendarView />} />
                      
                      {/* Fallback */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
