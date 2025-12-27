import express from "express";
import Request from "../models/Request.js";
import Equipment from "../models/Equipment.js";
import Team from "../models/Team.js";

const router = express.Router();

// Get all requests with filtering
router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.stage) query.stage = req.query.stage;
    if (req.query.team) query.maintenanceTeam = req.query.team;
    if (req.query.equipment) query.equipment = req.query.equipment;

    const requests = await Request.find(query)
      .populate("equipment", "name serialNumber")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get request by ID
router.get("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("equipment");
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new request with auto-fill
router.post("/", async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.body.equipment);
    if (!equipment) {
      return res.status(400).json({ error: "Equipment not found" });
    }

    const request = new Request({
      ...req.body,
      equipmentName: equipment.name,
      category: equipment.category,
      maintenanceTeam: equipment.maintenanceTeam,
      assignedTechnician:
        req.body.assignedTechnician || equipment.defaultTechnician,
    });

    await request.save();

    // Update team active requests count
    await Team.findOneAndUpdate(
      { name: equipment.maintenanceTeam },
      { $inc: { activeRequests: 1 } }
    );

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update request with stage transition logic
router.put("/:id", async (req, res) => {
  try {
    const oldRequest = await Request.findById(req.params.id);
    if (!oldRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    const updates = { ...req.body };

    // Handle stage transitions
    if (updates.stage && updates.stage !== oldRequest.stage) {
      if (updates.stage === "In Progress" && !oldRequest.startDate) {
        updates.startDate = new Date();
      }

      if (updates.stage === "Repaired" || updates.stage === "Scrap") {
        updates.completionDate = new Date();

        // Scrap logic
        if (updates.stage === "Scrap") {
          await Equipment.findByIdAndUpdate(oldRequest.equipment, {
            status: "Scrapped",
          });
        }

        // Decrease team active requests
        await Team.findOneAndUpdate(
          { name: oldRequest.maintenanceTeam },
          { $inc: { activeRequests: -1 } }
        );
      }
    }

    const request = await Request.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete request
router.delete("/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
