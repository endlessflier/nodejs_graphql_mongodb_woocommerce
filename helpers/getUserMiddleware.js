import jwt from "jsonwebtoken";
import Sentry from "../config/sentry";
import User from "../database/schemas/User";

export const getUser = async (token, email) => {
  let t;
  if (token.startsWith("Bearer ")) {
    t = token.slice(7, token.length);
  } else if (email) {
    const user = await User.findOne({ email: email }).exec();
    return user || null;
  } else {
    // Sentry.captureException({message:"user token not found", token})
    return null;
  }
  return jwt.verify(t, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      Sentry.captureException(err)
      return null;
    }

    if (Object.keys(user).length == 0) {
      Sentry.captureException({message:"user not found", user})
      return null;
    } else {
      return user;
    }
  });
};
