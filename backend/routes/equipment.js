import express from "express";
import { db, generateId } from "../config/db.js";

const router = express.Router();

// Get all equipment
router.get("/", (req, res) => {
  res.json(db.equipment);
});

// Get equipment by ID
router.get("/:id", (req, res) => {
  const equipment = db.equipment.find((eq) => eq.id === req.params.id);
  if (!equipment) {
    return res.status(404).json({ error: "Equipment not found" });
  }

  // Get related requests for smart button
  const relatedRequests = db.requests.filter(
    (r) => r.equipment === equipment.id
  );

  res.json({
    ...equipment,
    relatedRequests: relatedRequests.length,
    requests: relatedRequests,
  });
});

// Create new equipment
router.post("/", (req, res) => {
  const newEquipment = {
    id: generateId("EQ"),
    ...req.body,
    status: "Active",
    createdAt: new Date().toISOString(),
  };

  db.equipment.push(newEquipment);
  res.status(201).json(newEquipment);
});

// Update equipment
router.put("/:id", (req, res) => {
  const index = db.equipment.findIndex((eq) => eq.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Equipment not found" });
  }

  db.equipment[index] = {
    ...db.equipment[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.json(db.equipment[index]);
});

// Delete equipment
router.delete("/:id", (req, res) => {
  const index = db.equipment.findIndex((eq) => eq.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Equipment not found" });
  }

  db.equipment.splice(index, 1);
  res.json({ message: "Equipment deleted successfully" });
});

export default router;
