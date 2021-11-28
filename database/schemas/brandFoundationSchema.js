import mongoose from "mongoose";

let brandFoundationSchema = new mongoose.Schema(
  {
    brand: { type: String, default: "" },
    product: { type: String, default: "" },
    base: { type: String, default: "" },
    coverage: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const brandFoundationModal = mongoose.model("brandFoundationOptions", brandFoundationSchema);

module.exports = brandFoundationModal;
