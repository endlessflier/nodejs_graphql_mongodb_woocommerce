import mongoose from "mongoose";

let addressSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName:{
      type: String
    },
    lastName:{
      type: String
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },

    city: {
      type: String,
    },
    state: {
      type: String,
    },
    company: {
      type: String,
    },
    country: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    country_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const addressModal = mongoose.model("address", addressSchema);

export default addressModal;
