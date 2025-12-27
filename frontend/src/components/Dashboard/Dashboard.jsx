import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, AreaChart, DonutChart } from "@tremor/react";
import StatCard from "./StatCard";
import RecentRequests from "./RecentRequests";
import { Plus, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    criticalEquipment: { count: 0, units: [] },
    technicianLoad: { utilization: 0, teams: [] },
    openRequests: { pending: 0, overdue: 0, byStage: {} },
  });
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard");
      const data = await response.json();
      setStats(data.stats);
      setRecentRequests(data.recentRequests);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Use mock data
      setStats({
        criticalEquipment: { count: 5, threshold: 30 },
        technicianLoad: {
          utilization: 85,
          teams: [
            { name: "Mechanics", utilization: 85 },
            { name: "IT Support", utilization: 60 },
          ],
        },
        openRequests: {
          pending: 12,
          overdue: 3,
          byStage: {
            new: 5,
            inProgress: 7,
            repaired: 0,
            scrap: 0,
          },
        },
      });
      setRecentRequests([
        {
          id: "REQ001",
          subject: "Past activity",
          requestedBy: "Mitchell Admin",
          assignedTechnician: "Alex Foster",
          category: "computer",
          stage: "New Request",
          company: "My company",
        },
      ]);
    }
  };

  // Prepare chart data
  const teamData =
    stats.technicianLoad.teams?.map((team) => ({
      name: team.name,
      "Utilization %": team.utilization,
    })) || [];

  const requestStageData = [
    { name: "New", value: stats.openRequests.byStage?.new || 0 },
    { name: "In Progress", value: stats.openRequests.byStage?.inProgress || 0 },
    { name: "Repaired", value: stats.openRequests.byStage?.repaired || 0 },
    { name: "Scrap", value: stats.openRequests.byStage?.scrap || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/kanban")}
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                Maintenance
              </motion.button>
              <button className="text-gray-900 font-bold border-b-2 border-blue-500 pb-1">
                Dashboard
              </button>
              <button
                onClick={() => navigate("/calendar")}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Maintenance Calendar
              </button>
              <button
                onClick={() => navigate("/equipment")}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Equipment
              </button>
              <button
                onClick={() => navigate("/kanban")}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Reporting
              </button>
              <button
                onClick={() => navigate("/teams")}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Teams
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Button & Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/requests/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Request
          </motion.button>
          <div className="flex-1 max-w-md ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              title="Critical Equipment"
              value={`${stats.criticalEquipment.count} Units`}
              subtitle={`Health < ${stats.criticalEquipment.threshold || 30}%`}
              type="critical"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              title="Technician Load"
              value={`${stats.technicianLoad.utilization}% Utilized`}
              subtitle="(Assign Carefully)"
              type="info"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              title="Open Requests"
              value={`${stats.openRequests.pending} Pending`}
              subtitle={`${stats.openRequests.overdue} Overdue`}
              type="success"
            />
          </motion.div>
        </div>

        {/* Charts Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Team Utilization Chart */}
          {teamData.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Team Utilization</h3>
              <AreaChart
                className="h-72"
                data={teamData}
                index="name"
                categories={["Utilization %"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value}%`}
                yAxisWidth={40}
              />
            </Card>
          )}

          {/* Request Distribution */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Request Distribution</h3>
            <DonutChart
              className="h-72"
              data={requestStageData}
              category="value"
              index="name"
              colors={["yellow", "blue", "green", "red"]}
              valueFormatter={(value) => `${value} requests`}
            />
          </Card>
        </motion.div>

        {/* Recent Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentRequests requests={recentRequests} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
