import mongoose from "mongoose";

let formulaSchema = new mongoose.Schema(
  {
    code: {
      required: true,
      type: String,
      unique: true,
    },
    baseCode: String,
    baseType: String,
    base: String,
    yellow: String,
    red: String,
    black: String,
    white: String,
    green: String,
  },
  {
    timestamps: true,
  }
);

const formulaModals = mongoose.model("formula", formulaSchema);

export default formulaModals;
