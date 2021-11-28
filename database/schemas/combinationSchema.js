var mongoose = require("mongoose");

let combinationSchema = mongoose.Schema(
  {
    combination: {
      type: String,
      required: true,
      unique: true,
    },
    colorCode: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["L", "F", "M", "T", "D", "P"],
    },
    addedAt: {
      type: Date,
      default: new Date(),
    }
  },
  {
    timestamps: true,
  }
);

var combinationModel = mongoose.model("combinations", combinationSchema);

module.exports = combinationModel;
