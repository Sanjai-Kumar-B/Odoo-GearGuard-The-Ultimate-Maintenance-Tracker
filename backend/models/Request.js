import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Corrective", "Preventive"], required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    equipmentName: String,
    category: String,
    maintenanceTeam: { type: String, required: true },
    assignedTechnician: String,
    stage: {
      type: String,
      enum: ["New Request", "In Progress", "Repaired", "Scrap"],
      default: "New Request",
    },
    scheduledDate: Date,
    startDate: Date,
    completionDate: Date,
    duration: Number,
    isOverdue: { type: Boolean, default: false },
    notes: [{ text: String, createdAt: Date }],
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
