import express from "express";
import Equipment from "../models/Equipment.js";
import Request from "../models/Request.js";
import Team from "../models/Team.js";

const router = express.Router();

// Get dashboard statistics
router.get("/stats", async (req, res) => {
  try {
    const [
      totalEquipment,
      criticalHealth,
      activeRequests,
      completedToday,
      equipmentByStatus,
      requestsByStage,
    ] = await Promise.all([
      // Total equipment count
      Equipment.countDocuments(),

      // Critical health equipment (health < 30)
      Equipment.countDocuments({ health: { $lt: 30 } }),

      // Active requests
      Request.countDocuments({
        stage: { $in: ["New Request", "In Progress"] },
      }),

      // Requests completed today
      Request.countDocuments({
        completionDate: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      }),

      // Equipment breakdown by status
      Equipment.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),

      // Requests breakdown by stage
      Request.aggregate([
        {
          $group: {
            _id: "$stage",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Get average health
    const healthAgg = await Equipment.aggregate([
      {
        $group: {
          _id: null,
          avgHealth: { $avg: "$health" },
        },
      },
    ]);
    const avgHealth =
      healthAgg.length > 0 ? Math.round(healthAgg[0].avgHealth) : 0;

    res.json({
      totalEquipment,
      criticalHealth,
      activeRequests,
      completedToday,
      avgHealth,
      equipmentByStatus: equipmentByStatus.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      requestsByStage: requestsByStage.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent requests
router.get("/recent-requests", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const requests = await Request.find()
      .populate("equipment", "name serialNumber")
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get equipment health trends
router.get("/health-trends", async (req, res) => {
  try {
    const equipment = await Equipment.find()
      .select("name health updatedAt")
      .sort({ updatedAt: -1 })
      .limit(50);

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get team workload
router.get("/team-workload", async (req, res) => {
  try {
    const teams = await Team.find().select(
      "name activeRequests specialization"
    );
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
