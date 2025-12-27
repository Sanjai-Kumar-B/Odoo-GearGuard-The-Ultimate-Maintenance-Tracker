import express from "express";
import Equipment from "../models/Equipment.js";
import Request from "../models/Request.js";

const router = express.Router();

// Get all equipment
router.get("/", async (req, res) => {
  try {
    const equipment = await Equipment.find().sort({ createdAt: -1 });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get equipment by ID with related requests
router.get("/:id", async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    const relatedRequests = await Request.find({
      equipment: equipment._id,
    }).sort({ createdAt: -1 });

    res.json({
      ...equipment.toObject(),
      relatedRequests: relatedRequests.length,
      requests: relatedRequests,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new equipment
router.post("/", async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Serial number already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Update equipment
router.put("/:id", async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    res.json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete equipment
router.delete("/:id", async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    res.json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
