import mongoose from "mongoose";
import dotenv from "dotenv";
import Equipment from "./models/Equipment.js";
import Team from "./models/Team.js";
import Request from "./models/Request.js";

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/gearguard"
    );
    console.log("📦 Connected to MongoDB");

    // Clear existing data
    await Equipment.deleteMany({});
    await Team.deleteMany({});
    await Request.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Create teams
    const teams = await Team.create([
      {
        name: "Mechanical Team",
        specialization: "Pumps and Compressors",
        members: [
          { name: "John Smith", role: "Lead Technician" },
          { name: "Sarah Johnson", role: "Technician" },
          { name: "Mike Wilson", role: "Apprentice" },
        ],
        activeRequests: 0,
      },
      {
        name: "Electrical Team",
        specialization: "Motors and Controls",
        members: [
          { name: "Emily Davis", role: "Lead Technician" },
          { name: "David Brown", role: "Technician" },
        ],
        activeRequests: 0,
      },
      {
        name: "HVAC Team",
        specialization: "Climate Control Systems",
        members: [
          { name: "Alex Chen", role: "Lead Technician" },
          { name: "Maria Garcia", role: "Technician" },
        ],
        activeRequests: 0,
      },
    ]);
    console.log("✅ Created teams");

    // Create equipment
    const equipment = await Equipment.create([
      {
        name: "Centrifugal Pump CP-101",
        serialNumber: "CP-101-2024",
        category: "Pumps",
        department: "Production",
        location: "Building A - Floor 2",
        maintenanceTeam: "Mechanical Team",
        defaultTechnician: "John Smith",
        health: 85,
        status: "Active",
      },
      {
        name: "Air Compressor AC-205",
        serialNumber: "AC-205-2024",
        category: "Compressors",
        department: "Production",
        location: "Building B - Floor 1",
        maintenanceTeam: "Mechanical Team",
        defaultTechnician: "Sarah Johnson",
        health: 72,
        status: "Active",
      },
      {
        name: "Motor Drive MD-303",
        serialNumber: "MD-303-2024",
        category: "Motors",
        department: "Assembly",
        location: "Building A - Floor 3",
        maintenanceTeam: "Electrical Team",
        defaultTechnician: "Emily Davis",
        health: 25,
        status: "Under Maintenance",
      },
      {
        name: "HVAC Unit HV-401",
        serialNumber: "HV-401-2024",
        category: "HVAC",
        department: "Facilities",
        location: "Building C - Roof",
        maintenanceTeam: "HVAC Team",
        defaultTechnician: "Alex Chen",
        health: 90,
        status: "Active",
      },
      {
        name: "Hydraulic Press HP-502",
        serialNumber: "HP-502-2024",
        category: "Presses",
        department: "Production",
        location: "Building B - Floor 2",
        maintenanceTeam: "Mechanical Team",
        defaultTechnician: "John Smith",
        health: 45,
        status: "Active",
      },
      {
        name: "Conveyor Belt CB-601",
        serialNumber: "CB-601-2024",
        category: "Conveyors",
        department: "Logistics",
        location: "Warehouse - Section A",
        maintenanceTeam: "Mechanical Team",
        defaultTechnician: "Mike Wilson",
        health: 65,
        status: "Active",
      },
    ]);
    console.log("✅ Created equipment");

    // Create requests
    const requests = await Request.create([
      {
        subject: "Oil leak detected",
        description:
          "Oil leak found near the pump seal. Immediate attention required.",
        type: "Corrective",
        priority: "High",
        equipment: equipment[0]._id,
        equipmentName: equipment[0].name,
        category: equipment[0].category,
        maintenanceTeam: equipment[0].maintenanceTeam,
        assignedTechnician: "John Smith",
        stage: "In Progress",
        scheduledDate: new Date(),
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        notes: [
          {
            text: "Initial inspection completed",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        subject: "Motor overheating",
        description:
          "Motor temperature exceeds normal operating range. Health critical.",
        type: "Corrective",
        priority: "Critical",
        equipment: equipment[2]._id,
        equipmentName: equipment[2].name,
        category: equipment[2].category,
        maintenanceTeam: equipment[2].maintenanceTeam,
        assignedTechnician: "Emily Davis",
        stage: "In Progress",
        scheduledDate: new Date(),
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        notes: [
          {
            text: "Thermal imaging shows hotspot on rotor",
            timestamp: new Date(),
          },
        ],
      },
      {
        subject: "Routine maintenance due",
        description:
          "Scheduled preventive maintenance for HVAC filter replacement.",
        type: "Preventive",
        priority: "Medium",
        equipment: equipment[3]._id,
        equipmentName: equipment[3].name,
        category: equipment[3].category,
        maintenanceTeam: equipment[3].maintenanceTeam,
        assignedTechnician: "Alex Chen",
        stage: "New Request",
        scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      },
      {
        subject: "Belt tension adjustment needed",
        description:
          "Conveyor belt showing signs of wear. Needs tension adjustment.",
        type: "Preventive",
        priority: "Low",
        equipment: equipment[5]._id,
        equipmentName: equipment[5].name,
        category: equipment[5].category,
        maintenanceTeam: equipment[5].maintenanceTeam,
        assignedTechnician: "Mike Wilson",
        stage: "New Request",
        scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    ]);
    console.log("✅ Created requests");

    // Update team active requests
    await Team.updateOne({ name: "Mechanical Team" }, { activeRequests: 1 });
    await Team.updateOne({ name: "Electrical Team" }, { activeRequests: 1 });
    console.log("✅ Updated team counts");

    console.log("\n✨ Database seeded successfully!");
    console.log(`   - ${teams.length} teams`);
    console.log(`   - ${equipment.length} equipment items`);
    console.log(`   - ${requests.length} maintenance requests`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
