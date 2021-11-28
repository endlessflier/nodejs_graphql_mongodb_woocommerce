import mongoose from "mongoose";

let layoutOneSchema = mongoose.Schema(
  {
    layout: { type: String, default: "" },
    data: [{ id: String, description: String, image: String, disabled: Boolean }],
    type: String,
  },
  {
    timestamps: true,
  }
);

const layoutOneModals = mongoose.model("layoutones", layoutOneSchema);

export default layoutOneModals;
