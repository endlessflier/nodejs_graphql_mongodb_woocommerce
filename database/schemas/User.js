import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import bcrypt from "bcrypt";
let saltRounds = 10;

let userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
    default: "female",
  },
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
    required: true,
  },
  image: {
    type: String,
  },
  socialLoginId: {
    type: String,
    default: "",
  },
  tokens: [String],

  chargebeeCustomerID: {
    type: String,
    default: "",
  },
  formulaCode: {
    type: String,
    default: "",
  },
});
userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  let hash = await bcrypt.hash(user.password, saltRounds);
  user.password = hash;
  next();
});

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);

export default User;
