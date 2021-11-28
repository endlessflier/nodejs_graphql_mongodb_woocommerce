import mongoose from "mongoose";

let layoutTwoSchema = mongoose.Schema(
  {
    layout: { type: String, default: "" },
    data: [{ id: String,columnId:String, description: String, image: String }],
    type: String,
  },
  {
    timestamps: true,
  }
);

const layoutTwoModals = mongoose.model("layouttwos", layoutTwoSchema);

export default layoutTwoModals;
