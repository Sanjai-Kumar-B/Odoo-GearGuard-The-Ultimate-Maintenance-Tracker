import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wrench,
  Users,
  ClipboardList,
  Calendar,
  Plus,
} from "lucide-react";

const Navbar = () => {
  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/kanban", icon: ClipboardList, label: "Kanban Board" },
    { path: "/equipment", icon: Wrench, label: "Equipment" },
    { path: "/teams", icon: Users, label: "Teams" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Wrench className="w-8 h-8 text-blue-400" />
            <h1 className="text-xl font-bold">GearGuard</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Quick Action */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/requests/new")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">New Request</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
