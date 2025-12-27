import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import RequestCard from "./RequestCard";

const KanbanColumn = ({ stage, requests }) => {
  const getStageColor = () => {
    const colors = {
      "New Request": "bg-yellow-100 border-yellow-300",
      "In Progress": "bg-blue-100 border-blue-300",
      Repaired: "bg-green-100 border-green-300",
      Scrap: "bg-red-100 border-red-300",
    };
    return colors[stage] || "bg-gray-100";
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${getStageColor()}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">{stage}</h2>
        <motion.span
          key={requests.length}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="bg-white px-2 py-1 rounded-full text-sm font-semibold"
        >
          {requests.length}
        </motion.span>
      </div>

      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[400px] transition-colors ${
              snapshot.isDraggingOver ? "bg-white/50 rounded-lg" : ""
            }`}
          >
            {requests.map((request, index) => (
              <RequestCard key={request._id} request={request} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
