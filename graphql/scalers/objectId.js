const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
import mongoose from "mongoose";

const IdScalers = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",
  parseValue(value) {
    return mongoose.Types.ObjectId(value);
  },
  serialize(value) {
    return value.toHexString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return mongoose.Types.ObjectId(ast.value);
    }
    return null;
  },
});
export default IdScalers;
