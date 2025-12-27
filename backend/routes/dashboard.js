import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

// Get dashboard statistics
router.get("/", (req, res) => {
  try {
    // Calculate critical equipment (health < 30%)
    const criticalEquipment = db.equipment.filter((eq) => eq.health < 30);

    // Calculate average technician utilization
    const avgUtilization = Math.round(
      db.teams.reduce((sum, team) => sum + team.utilizationRate, 0) /
        db.teams.length
    );

    // Calculate open requests
    const openRequests = db.requests.filter(
      (req) => req.stage !== "Repaired" && req.stage !== "Scrap"
    );
    const overdueRequests = openRequests.filter((req) => {
      if (!req.scheduledDate) return false;
      return (
        new Date(req.scheduledDate) < new Date() && req.stage !== "Repaired"
      );
    });

    const stats = {
      criticalEquipment: {
        count: criticalEquipment.length,
        threshold: 30,
        items: criticalEquipment.map((eq) => ({
          id: eq.id,
          name: eq.name,
          health: eq.health,
        })),
      },
      technicianLoad: {
        utilization: avgUtilization,
        teams: db.teams.map((team) => ({
          name: team.name,
          utilization: team.utilizationRate,
          activeRequests: team.activeRequests,
        })),
      },
      openRequests: {
        total: openRequests.length,
        pending: openRequests.length,
        overdue: overdueRequests.length,
        byStage: {
          new: db.requests.filter((r) => r.stage === "New Request").length,
          inProgress: db.requests.filter((r) => r.stage === "In Progress")
            .length,
          repaired: db.requests.filter((r) => r.stage === "Repaired").length,
          scrap: db.requests.filter((r) => r.stage === "Scrap").length,
        },
      },
    };

    // Get recent requests (last 10)
    const recentRequests = [...db.requests]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.json({
      stats,
      recentRequests,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
