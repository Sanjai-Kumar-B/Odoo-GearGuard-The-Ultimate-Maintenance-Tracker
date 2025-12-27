import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    department: { type: String, required: true },
    assignedTo: String,
    location: { type: String, required: true },
    purchaseDate: Date,
    warrantyExpiry: Date,
    maintenanceTeam: { type: String, required: true },
    defaultTechnician: String,
    health: { type: Number, default: 100, min: 0, max: 100 },
    status: {
      type: String,
      enum: ["Active", "Under Maintenance", "Scrapped"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
