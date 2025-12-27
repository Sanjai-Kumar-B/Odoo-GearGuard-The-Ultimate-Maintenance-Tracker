import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Wrench, AlertCircle } from "lucide-react";

const EquipmentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    fetchEquipmentDetail();
  }, [id]);

  const fetchEquipmentDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/equipment/${id}`);
      const data = await response.json();
      setEquipment(data);
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!equipment) {
    return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  }

  const openRequests = requests.filter(
    (r) => r.stage !== "Repaired" && r.stage !== "Scrap"
  );
  const getHealthColor = (health) => {
    if (health < 30) return "text-red-600 bg-red-100";
    if (health < 70) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/equipment")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">{equipment.name}</h1>
              <p className="text-gray-500">{equipment.serialNumber}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/equipment/edit/${id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit className="w-5 h-5" />
            Edit
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-bold mb-4">Equipment Details</h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">Category</label>
                <p className="font-medium">{equipment.category}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Department</label>
                <p className="font-medium">{equipment.department}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Assigned To</label>
                <p className="font-medium">
                  {equipment.assignedTo || "Unassigned"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Location</label>
                <p className="font-medium">{equipment.location}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Purchase Date</label>
                <p className="font-medium">
                  {equipment.purchaseDate
                    ? new Date(equipment.purchaseDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Warranty Expiry</label>
                <p className="font-medium">
                  {equipment.warrantyExpiry
                    ? new Date(equipment.warrantyExpiry).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Maintenance Team
                </label>
                <p className="font-medium">{equipment.maintenanceTeam}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Default Technician
                </label>
                <p className="font-medium">
                  {equipment.defaultTechnician || "None"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Health Status</label>
                <span
                  className={`inline-block px-3 py-1 rounded-full font-semibold ${getHealthColor(equipment.health)}`}
                >
                  {equipment.health}%
                </span>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <p
                  className={`font-medium ${equipment.status === "Active" ? "text-green-600" : "text-red-600"}`}
                >
                  {equipment.status}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Smart Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-bold mb-4">Actions</h2>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRequests(!showRequests)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-between relative"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                <span>Maintenance</span>
              </div>
              {openRequests.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {openRequests.length}
                </motion.span>
              )}
            </motion.button>

            {equipment.health < 30 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2"
              >
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">Critical Health</p>
                  <p className="text-sm text-red-600">
                    This equipment requires immediate attention
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Maintenance Requests */}
        {showRequests && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-bold mb-4">
              Maintenance Requests ({requests.length})
            </h2>

            {requests.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No maintenance requests for this equipment
              </p>
            ) : (
              <div className="space-y-3">
                {requests.map((request) => (
                  <motion.div
                    key={request._id}
                    whileHover={{ scale: 1.01 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{request.subject}</h3>
                        <p className="text-sm text-gray-600">
                          {request.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Created:{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          request.stage === "New Request"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.stage === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : request.stage === "Repaired"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.stage}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-4 text-sm">
                      <span className="text-gray-600">
                        Type: <strong>{request.type}</strong>
                      </span>
                      <span className="text-gray-600">
                        Priority: <strong>{request.priority}</strong>
                      </span>
                      <span className="text-gray-600">
                        Technician:{" "}
                        <strong>{request.assignedTechnician}</strong>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDetail;
