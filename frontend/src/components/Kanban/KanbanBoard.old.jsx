import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import KanbanColumn from "./KanbanColumn";

const stages = ["New Request", "In Progress", "Repaired", "Scrap"];

const KanbanBoard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const newStage = destination.droppableId;
    const requestId = draggableId;

    // Update request stage
    try {
      await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });

      // Update local state
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, stage: newStage } : r))
      );
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const groupedRequests = stages.reduce((acc, stage) => {
    acc[stage] = requests.filter((r) => r.stage === stage);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Maintenance Requests
      </motion.h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <KanbanColumn
                stage={stage}
                requests={groupedRequests[stage] || []}
              />
            </motion.div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
