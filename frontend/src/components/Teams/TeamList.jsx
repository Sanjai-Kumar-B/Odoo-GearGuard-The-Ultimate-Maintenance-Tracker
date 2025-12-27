import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamList = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teams");
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-3xl font-bold">Maintenance Teams</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/teams/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Team
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={team._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/teams/${team._id}`)}
              className="bg-white rounded-lg shadow hover:shadow-lg p-6 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{team.name}</h3>
                  <p className="text-sm text-gray-500">
                    {team.members.length} members
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  Team Members:
                </p>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((member) => (
                    <span
                      key={member.id}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {member.name}
                    </span>
                  ))}
                </div>
              </div>

              {team.specialization && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Specialization:</span>{" "}
                    {team.specialization}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {teams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg shadow"
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No teams found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamList;
