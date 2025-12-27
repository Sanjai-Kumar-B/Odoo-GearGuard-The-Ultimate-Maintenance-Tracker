import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { X, Save } from "lucide-react";

const RequestForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEdit = !!id;

  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    type: location.state?.type || "Corrective",
    priority: "Medium",
    equipmentId: "",
    equipmentName: "",
    category: "",
    maintenanceTeam: "",
    assignedTechnician: "",
    scheduledDate: location.state?.scheduledDate || "",
    stage: "New Request",
  });

  useEffect(() => {
    fetchEquipment();
    if (isEdit) {
      fetchRequest();
    }
  }, [id]);

  const fetchEquipment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/equipment");
      const data = await response.json();
      setEquipment(data.filter((eq) => eq.status === "Active"));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/requests/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEquipmentChange = (e) => {
    const selectedId = e.target.value;
    const selectedEquipment = equipment.find((eq) => eq._id === selectedId);

    if (selectedEquipment) {
      setFormData({
        ...formData,
        equipmentId: selectedId,
        equipmentName: selectedEquipment.name,
        category: selectedEquipment.category,
        maintenanceTeam: selectedEquipment.maintenanceTeam,
        assignedTechnician: selectedEquipment.defaultTechnician || "",
      });
    } else {
      setFormData({
        ...formData,
        equipmentId: "",
        equipmentName: "",
        category: "",
        maintenanceTeam: "",
        assignedTechnician: "",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEdit
        ? `http://localhost:5000/api/requests/${id}`
        : "http://localhost:5000/api/requests";

      // Transform equipmentId to equipment for backend
      const payload = {
        ...formData,
        equipment: formData.equipmentId,
      };
      delete payload.equipmentId;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/kanban");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Maintenance Request" : "New Maintenance Request"}
          </h1>
          <button
            onClick={() => navigate("/kanban")}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Request Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Corrective</option>
                <option>Preventive</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Corrective: Unplanned repair | Preventive: Scheduled maintenance
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Priority *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          {/* Equipment Selection - Auto-fill magic happens here */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Equipment *
            </label>
            <select
              name="equipmentId"
              value={formData.equipmentId}
              onChange={handleEquipmentChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Equipment</option>
              {equipment.map((eq) => (
                <option key={eq._id} value={eq._id}>
                  {eq.name} - {eq.serialNumber} ({eq.department})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Team and technician will be auto-filled based on equipment
            </p>
          </div>

          {/* Auto-filled fields (read-only) */}
          {formData.equipmentId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-blue-50 p-4 rounded-lg"
            >
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Category
                </label>
                <p className="font-medium text-blue-700">{formData.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Maintenance Team
                </label>
                <p className="font-medium text-blue-700">
                  {formData.maintenanceTeam}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Default Technician
                </label>
                <p className="font-medium text-blue-700">
                  {formData.assignedTechnician || "Not assigned"}
                </p>
              </div>
            </motion.div>
          )}

          {/* Request Details */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g., Leaking Oil, Motor Overheating"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe the issue in detail..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Scheduled Date (especially for Preventive) */}
          {formData.type === "Preventive" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="block text-sm font-medium mb-2">
                Scheduled Date *
              </label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required={formData.type === "Preventive"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                This request will appear on the calendar on this date
              </p>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isEdit ? "Update" : "Create"} Request
            </motion.button>
            <button
              type="button"
              onClick={() => navigate("/kanban")}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RequestForm;
