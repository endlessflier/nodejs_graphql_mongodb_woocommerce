import mongoose from "mongoose";

let supportSchema = mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    message: { type: String, default: "" },
    type: String,
  },
  {
    timestamps: true,
  }
);

const supportModals = mongoose.model("support", supportSchema);

export default supportModals;
