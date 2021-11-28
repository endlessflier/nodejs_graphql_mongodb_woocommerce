import mongoose from "mongoose";
//promise
mongoose.Promise = global.Promise;

//connect
const DBConnect = async () => {
  const dbUrl = process.env.DB_URI;
  console.log("dbUrl", dbUrl);
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("🚀 Connected to mongo!!!");
  } catch (err) {
    console.log("err", err);
    console.log("Could not connect to MongoDB");
  }
};

export default DBConnect;
