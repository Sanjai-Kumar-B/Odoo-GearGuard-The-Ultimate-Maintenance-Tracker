import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    specialization: String,
    members: [
      {
        name: { type: String, required: true },
        role: { type: String, default: "Technician" },
      },
    ],
    activeRequests: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
