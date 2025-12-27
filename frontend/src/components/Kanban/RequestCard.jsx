import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";

const RequestCard = ({ request, index }) => {
  const getPriorityColor = () => {
    const colors = {
      Critical: "border-l-4 border-l-red-500",
      High: "border-l-4 border-l-orange-500",
      Medium: "border-l-4 border-l-yellow-500",
      Low: "border-l-4 border-l-green-500",
    };
    return colors[request.priority] || "";
  };

  return (
    <Draggable draggableId={request._id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-move ${getPriorityColor()} ${
            snapshot.isDragging ? "rotate-2 shadow-2xl" : ""
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm">{request.subject}</h3>
            {request.isOverdue && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
              </motion.div>
            )}
          </div>

          <p className="text-xs text-gray-600 mb-3">{request.equipmentName}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {request.assignedTechnician && (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  {request.assignedTechnician.charAt(0)}
                </motion.div>
              )}
              <span className="text-xs text-gray-500">
                {request.assignedTechnician}
              </span>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded ${
                request.type === "Corrective"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {request.type}
            </span>
          </div>

          {request.scheduledDate && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {new Date(request.scheduledDate).toLocaleDateString()}
            </div>
          )}
        </motion.div>
      )}
    </Draggable>
  );
};

export default RequestCard;
