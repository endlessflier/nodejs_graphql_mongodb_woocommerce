import mongoose from "mongoose";

let settingSchema = mongoose.Schema(
  {
    privacy: { type: String, default: "" },
    terms: { type: String, default: "" },
    howitworks: { type: String, default: "" },
    aboutUs: { type: String, default: "" },
    shippingPolicy: { type: String, default: "" },
    faqs: [{ title: String, description: String, image: String }],
    type: String,
  },
  {
    timestamps: true,
  }
);

const settingModals = mongoose.model("settings", settingSchema);

export default settingModals;
