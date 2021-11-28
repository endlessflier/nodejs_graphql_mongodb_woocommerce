//dot env configuration
import awsHelper from "./helpers/awsHelper";
const fs = require("fs").promises;
var dotenv = require("dotenv");
dotenv.config();

//launch server after loading env var

try {
  awsHelper
    .getSecrets()

    .then(async (secretsString) => {
      await fs.writeFile(".env", secretsString);

      dotenv.config();

      require("./server/server.js");
    });
} catch (error) {
  console.log("Error in setting environment variables", error);
  process.exit(-1);
}
