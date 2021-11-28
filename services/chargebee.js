import User from "../database/schemas/User";
import express from "express";
import chargebeeApi from "../helpers/chargebee";
const router = express.Router();

module.exports = function (app) {
  app.use("/api/chargebee", router);

  router.get("/default-subscription", async (req, res, next) => {
    try {
      const subscription = await chargebeeApi.getChargebeeDefaultSubscription();

      const response = {
        success: true,
        status: 200,
        data: {
          ...subscription.plan,
          totalPrice: (subscription.setup_cost + subscription.price) / 100
        },
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    } catch (err) {
      res.status(500);
      res.write(
        JSON.stringify({
          success: false,
          status: 500,
          message: err.message,
        })
      );

      res.end();
    }
  });

  router.get("/plans", async (req, res, next) => {
    try {
      const plans = await chargebeeApi.listPlans();

      const response = {
        success: true,
        status: 200,
        data: plans,
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    } catch (err) {
      res.status(500);
      res.write(
        JSON.stringify({
          success: false,
          status: 500,
          message: err.message,
        })
      );

      res.end();
    }
  });

  router.get("/addons", async (req, res, next) => {
    try {
      const addons = await chargebeeApi.listAddons();

      const response = {
        success: true,
        status: 200,
        data: addons,
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    } catch (err) {
      res.status(500);
      res.write(
        JSON.stringify({
          success: false,
          status: 500,
          message: err.message,
        })
      );

      res.end();
    }
  });
 
  router.get("/coupon", async (req, res, next) => {
    console.log(req.body.coupon);
    try {
      const coupon = await chargebeeApi.getCoupon(req.body.coupon);
      const response = {
        success: true,
        status: 200,
        data: coupon,
      };
      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    } catch (err) {
      res.status(500);
      res.write(
        JSON.stringify({
          success: false,
          status: 500,
          message: err.message,
        })
      );
      res.end();
    }
  });
};
