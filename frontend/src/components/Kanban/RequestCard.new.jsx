import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, User } from "lucide-react";

const RequestCard = ({ request, index }) => {
  const isOverdue = () => {
    const today = new Date();
    const scheduled = new Date(request.scheduledDate);
    return (
      scheduled < today && (request.stage === "New" || request.stage === "In Progress")
    );
  };

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
          } ${isOverdue() ? "bg-red-50 border-2 border-red-200" : ""}`}
        >
          {isOverdue() && (
            <div className="flex items-center gap-1 text-red-600 text-xs font-semibold mb-2">
              <AlertTriangle className="w-3 h-3" />
              Overdue
            </div>
          )}
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {request.subject}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {request.equipmentName}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">
                {request.assignedTechnician}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(request.scheduledDate).toLocaleDateString()}</span>
            </div>
          </div>

          {request.type === "Preventive" && (
            <div className="mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded inline-block">
              Preventive
            </div>
          )}
        </motion.div>
      )}
    </Draggable>
  );
};

export default RequestCard;
