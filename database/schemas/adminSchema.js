import mongoose from "mongoose";

let adminSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email!",
      },
      required: [true, "Email required"],
    },
    password: {
      type: String,
    },
    permissions: {
      superAdmin: [String],
      tabletAdmin: [String],
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    adminLevels: {
      type: [String],
      enum: ["superAdmin", "tabletAdmin"],
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    maxAssignedOrders: {
      type: Number,
      default: 100
    },
    activeOrders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// adminSchema.method('transform', function() {
//   var obj = this.toObject();

//   //Rename fields
//   obj.id = obj._id;
//   delete obj._id;

//   return obj;
// });

const adminModals = mongoose.model("admins", adminSchema);

export default adminModals;
