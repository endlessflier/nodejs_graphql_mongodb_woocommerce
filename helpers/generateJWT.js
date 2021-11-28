import User from "../database/schemas/User";

const jwt = require("jsonwebtoken");
export const generateJWT = (user) => {
  const token = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET);
  return token;
};
