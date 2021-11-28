import express from "express";
import Sentry from "../config/sentry";
import { createDefaultJFYSubscription } from '../database/providers/orderProvider'
import { createOrderSchema } from '../helpers/apiSchemaValidation'
import requestHelper from "../helpers/request"

const router = express.Router();

module.exports = function (app) {
  app.use("/api", router);
 
  router.post("/create/order", async (req, res, next) => {
    req.check(createOrderSchema);

    req.getValidationResult().then(async (validation) => {
      let postData = requestHelper.prepareInput(createOrderSchema, req.body);
      if (!validation.isEmpty()) {
        Sentry.captureException({
            error:JSON.stringify(validation.array()),
            message: "Error Log Order Creation",
            data:postData
        });
        res.status(400);
        res.write(
          JSON.stringify({
            success: false,
            status:400,
            errors: validation.array(),
            message: "Please fill the required fields",
          })
        );
        res.end();
        return;
      }

      try {
        const response = await createDefaultJFYSubscription(postData)
        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      } catch (err) { 
        console.log(err);
        Sentry.captureException({
            error:err,
            message: "Error Log Order Creation",
            data:postData
        });

        res.status(500);
        res.write(
          JSON.stringify({
            success: false,
            status:500,
            message: err.message,
          })
        );

        res.end();
      }
    });
  });
};
