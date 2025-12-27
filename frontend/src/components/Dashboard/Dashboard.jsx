import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Calendar,
  Wrench,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import RecentRequests from "./RecentRequests";

const Dashboard = () => {
  const navigate = useNavigate();
  const { requests, equipment } = useApp();

  // Calculate statistics
  const openRequests = requests.filter(
    (r) => r.stage === "New" || r.stage === "In Progress"
  ).length;

  const overdueRequests = requests.filter((r) => {
    const today = new Date();
    const scheduled = new Date(r.scheduledDate);
    return scheduled < today && (r.stage === "New" || r.stage === "In Progress");
  }).length;

  const upcomingPreventive = requests.filter((r) => {
    const today = new Date();
    const scheduled = new Date(r.scheduledDate);
    const diff = (scheduled - today) / (1000 * 60 * 60 * 24);
    return r.type === "Preventive" && diff > 0 && diff <= 7;
  }).length;

  const criticalEquipment = equipment.filter((eq) => eq.health < 30).length;

  const recentRequests = requests
    .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
    .slice(0, 5);

  const cards = [
    {
      title: "Open Maintenance Requests",
      value: openRequests,
      subtitle: `${requests.filter((r) => r.stage === "New").length} pending`,
      icon: Wrench,
      color: "blue",
      onClick: () => navigate("/maintenance"),
    },
    {
      title: "Overdue Requests",
      value: overdueRequests,
      subtitle: overdueRequests > 0 ? "Requires immediate attention" : "All on track",
      icon: AlertTriangle,
      color: overdueRequests > 0 ? "red" : "green",
      onClick: () => navigate("/maintenance"),
    },
    {
      title: "Upcoming Preventive",
      value: upcomingPreventive,
      subtitle: "Next 7 days",
      icon: Calendar,
      color: "purple",
      onClick: () => navigate("/calendar"),
    },
    {
      title: "Critical Equipment",
      value: criticalEquipment,
      subtitle: criticalEquipment > 0 ? "Health < 30%" : "All healthy",
      icon: TrendingUp,
      color: criticalEquipment > 0 ? "orange" : "green",
      onClick: () => navigate("/equipment"),
    },
  ];

  const colorClasses = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's your maintenance overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={card.onClick}
            className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`${colorClasses[card.color]} p-3 rounded-lg`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {card.value}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              {card.title}
            </div>
            <div className="text-xs text-gray-500">{card.subtitle}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Maintenance Requests
          </h2>
        </div>
        <RecentRequests requests={recentRequests} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
