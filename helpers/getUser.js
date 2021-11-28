import jwt from "jsonwebtoken";
import Sentry from "../config/sentry";
export const getUser = (token) => {
  let t;
  if (token.startsWith("Bearer ")) {
    t = token.slice(7, token.length);
  } 
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      Sentry.captureException(err)
      throw new Error("User is not authenticated");
    }
    let userData = {
      id: user?._id?.toString(),
      status: user.status,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    // return JSON.parse(userData);
    return userData;
  });
};
