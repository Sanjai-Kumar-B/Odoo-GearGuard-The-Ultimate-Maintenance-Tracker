import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wrench,
  Users,
  ClipboardList,
  Calendar,
  Plus,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/equipment", icon: Wrench, label: "Equipment" },
    { path: "/maintenance", icon: ClipboardList, label: "Maintenance" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/teams", icon: Users, label: "Teams" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Wrench className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">GearGuard</h1>
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
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/maintenance/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </motion.button>

            <div className="border-l h-8"></div>

            <div className="text-sm text-gray-700">{user?.companyName}</div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
