import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kanban" element={<KanbanBoard />} />

          {/* Equipment Routes */}
          <Route path="/equipment" element={<EquipmentList />} />
          <Route path="/equipment/new" element={<EquipmentForm />} />
          <Route path="/equipment/edit/:id" element={<EquipmentForm />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />

          {/* Request Routes */}
          <Route path="/requests/new" element={<RequestForm />} />
          <Route path="/requests/edit/:id" element={<RequestForm />} />

          {/* Team Routes */}
          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/new" element={<TeamForm />} />
          <Route path="/teams/:id" element={<TeamForm />} />

          {/* Calendar */}
          <Route path="/calendar" element={<CalendarView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
