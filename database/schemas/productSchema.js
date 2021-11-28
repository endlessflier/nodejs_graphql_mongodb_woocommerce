import mongoose from "mongoose";

let productSchema = mongoose.Schema(
  {
    name: { type: String, default: "" },
    price: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const productModals = mongoose.model("products", productSchema);

export default productModals;
