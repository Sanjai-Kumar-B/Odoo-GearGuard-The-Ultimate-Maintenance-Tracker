import express from "express";
import { db, generateId } from "../config/db.js";

const router = express.Router();

// Get all teams
router.get("/", (req, res) => {
  res.json(db.teams);
});

// Get team by ID
router.get("/:id", (req, res) => {
  const team = db.teams.find((t) => t.id === req.params.id);
  if (!team) {
    return res.status(404).json({ error: "Team not found" });
  }
  res.json(team);
});

// Create new team
router.post("/", (req, res) => {
  const newTeam = {
    id: generateId("TEAM"),
    ...req.body,
    activeRequests: 0,
    utilizationRate: 0,
    createdAt: new Date().toISOString(),
  };

  db.teams.push(newTeam);
  res.status(201).json(newTeam);
});

// Update team
router.put("/:id", (req, res) => {
  const index = db.teams.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Team not found" });
  }

  db.teams[index] = {
    ...db.teams[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.json(db.teams[index]);
});

export default router;
