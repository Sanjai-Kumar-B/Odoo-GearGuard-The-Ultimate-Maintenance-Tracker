import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import KanbanColumn from "./KanbanColumn";

const stages = ["New", "In Progress", "Repaired", "Scrap"];

const KanbanBoard = () => {
  const navigate = useNavigate();
  const { requests, updateRequestStage } = useApp();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const newStage = destination.droppableId;
    updateRequestStage(draggableId, newStage);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Maintenance Requests
          </h1>
          <p className="text-gray-600 mt-1">
            Drag and drop requests between stages
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/maintenance/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Request
        </motion.button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => {
            const stageRequests = requests.filter((r) => r.stage === stage);
            return (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <KanbanColumn stage={stage} requests={stageRequests} />
              </motion.div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
