import express from "express";
import { db, generateId } from "../config/db.js";

const router = express.Router();

// Get all requests (with optional filtering)
router.get("/", (req, res) => {
  let requests = [...db.requests];

  // Filter by stage
  if (req.query.stage) {
    requests = requests.filter((r) => r.stage === req.query.stage);
  }

  // Filter by team
  if (req.query.team) {
    requests = requests.filter((r) => r.maintenanceTeam === req.query.team);
  }

  // Filter by equipment
  if (req.query.equipment) {
    requests = requests.filter((r) => r.equipment === req.query.equipment);
  }

  res.json(requests);
});

// Get request by ID
router.get("/:id", (req, res) => {
  const request = db.requests.find((r) => r.id === req.params.id);
  if (!request) {
    return res.status(404).json({ error: "Request not found" });
  }
  res.json(request);
});

// Create new request
router.post("/", (req, res) => {
  const { equipment: equipmentId, ...rest } = req.body;

  // Auto-fill logic: Get equipment details
  const equipment = db.equipment.find((eq) => eq.id === equipmentId);
  if (!equipment) {
    return res.status(400).json({ error: "Equipment not found" });
  }

  const newRequest = {
    id: generateId("REQ"),
    equipment: equipmentId,
    equipmentName: equipment.name,
    category: equipment.category,
    maintenanceTeam: equipment.maintenanceTeam, // Auto-filled
    assignedTechnician: equipment.defaultTechnician, // Auto-filled
    ...rest,
    stage: "New Request",
    isOverdue: false,
    notes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.requests.push(newRequest);

  // Update team active requests count
  const team = db.teams.find((t) => t.name === newRequest.maintenanceTeam);
  if (team) {
    team.activeRequests += 1;
  }

  res.status(201).json(newRequest);
});

// Update request (including stage changes)
router.put("/:id", (req, res) => {
  const index = db.requests.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Request not found" });
  }

  const oldRequest = db.requests[index];
  const updates = { ...req.body };

  // Handle stage transitions
  if (updates.stage && updates.stage !== oldRequest.stage) {
    if (updates.stage === "In Progress" && !oldRequest.startDate) {
      updates.startDate = new Date().toISOString();
    }
    if (updates.stage === "Repaired" || updates.stage === "Scrap") {
      updates.completionDate = new Date().toISOString();

      // Scrap logic: mark equipment
      if (updates.stage === "Scrap") {
        const equipment = db.equipment.find(
          (eq) => eq.id === oldRequest.equipment
        );
        if (equipment) {
          equipment.status = "Scrapped";
        }
      }
    }
  }

  db.requests[index] = {
    ...oldRequest,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  res.json(db.requests[index]);
});

// Delete request
router.delete("/:id", (req, res) => {
  const index = db.requests.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Request not found" });
  }

  const request = db.requests[index];

  // Update team active requests count
  const team = db.teams.find((t) => t.name === request.maintenanceTeam);
  if (team && team.activeRequests > 0) {
    team.activeRequests -= 1;
  }

  db.requests.splice(index, 1);
  res.json({ message: "Request deleted successfully" });
});

export default router;
