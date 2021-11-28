import User from "../database/schemas/User";
import express from "express";
import Sentry from "../config/sentry";
const router = express.Router();
import { auth0 } from "../helpers/auth0Middleware";
import orderSchema from "../database/schemas/orderSchema";
import chargebeeApi from "../helpers/chargebee";
import { order, payment_intent, subscription } from "chargebee/lib/resources/api_endpoints";
const requestHelper = require("../helpers/request");

module.exports = function (app) {
  app.use("/api/user", router);

  router.post("/exists", async (req, res, next) => {
    if (req.body && req.body.email) {
      const user = await User.findOne({
        email: req.body.email,
      }).exec();

      if (user) {
        const response = {
          exists: true,
        };
        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      } else {
        const response = {
          exists: false,
        };

        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      }
    } else {
      const response = {
        message: "Invalid email",
      };

      res.status(400);
      res.write(JSON.stringify(response));
      res.end();
    }
  });

  router.get("/subscriptions", auth0, async (req, res, next) => {
    try {
      const user = await User.findOne({
        email: req.user.email,
      }).exec();

      if (user) {
        const subscriptions = await chargebeeApi.getSubscriptions({
          customer_id: user.chargebeeCustomerID,
          limit: req.body.limit || 20,
        });

        const response = {
          success: false,
          data: subscriptions,
        };
        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      } else {
        const response = {
          success: false,
          message: " User does not exists",
        };

        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      }
    } catch (error) {
      Sentry.captureException({
        error,
        message: "unable to get subscriptions",
      });

      const response = {
        success: false,
        message: "unable to get subscriptions",
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    }
  });

  router.get("/orders", auth0, async (req, res, next) => {
    try {
      const currentUser = await User.findOne({
        email: req.user.email,
      }).exec();

      const per_page = 10;
      const page = req.query.page >= 1 ? req.query.page : 1;

      const orders = await orderSchema
        .find({ user_id: currentUser._id })
        .limit(per_page)
        .skip((page-1)*per_page)
        .populate("user_id")
        .populate("address_id");

        console.log("current user",currentUser);

        console.log("orders",orders);
      
      const firstAndLastName = currentUser?.name?.split(' ')
      const firstName = firstAndLastName[0]
      const lastName = firstAndLastName[0]

      // orders response with required attributes
      const customerOrders = await Promise.all(orders.map(async (x) => {

        const order =  {
          firstName,
          lastName, 
          subscriptionID:x.subscriptionID,
          planId: x.planId,
          brand: x.brand,
          product: x.product,
          faceRgb: x.faceRgb,
          nickName:x.nickName,
          thumbs:x.thumbs,
          shadeCodes:x.shadeCodes,
          baseCode: x.baseCode,
          primaryColor: x.primaryColor,
          coverageCode: x.coverageCode,
          user_id:x.user_id,
          address_id:x.address_id,
          order_id:x._id,
          status:x.status,
          createdAt:x.createdAt,
          updatedAt:x.updatedAt,
         };
 
         const subData = await chargebeeApi.getSubscription(x.subscriptionID);

         order.sub =  subData;

         return order;
      }));
      

      if (orders) {
        res.status(200);
        res.write(
          JSON.stringify({
            success: true,
            data: customerOrders,
          })
        );
        res.end();
      } else {
        res.status(200);
        res.write(
          JSON.stringify({
            success: true,
            data: [],
          })
        );
        res.end();
      }
    } catch (error) {
      Sentry.captureException({
        error,
        message: "unable to get orders",
        currentUser,
      });
      throw new Error(error);
    }
  });

  router.post("/subscription/cancel",auth0,async (req, res, next) => {
    let schema = {
      subscription_id: {
        notEmpty: true,
        errorMessage: "subscription id required",
      },
    };
    req.check(schema);

    req.getValidationResult().then(async (validation) => {
      
      let postData = requestHelper.prepareInput(schema, req.body);

      if (!validation.isEmpty()) {
        Sentry.captureException({
          error: JSON.stringify(validation.array()),
          message: "Error Log Cancel Subscription_id",
          data: postData,
        });
        res.status(400);
        res.write(JSON.stringify({ error: true, errors: validation.array() }));
        res.end();
        return;
      }

      try {
        const currentUser = await User.findOne({
          email: req.user.email,
        }).exec();

        if (!currentUser) {
          res.status(500);
          res.write(
            JSON.stringify({ error: true, message: "Usere does not exits" })
          );
          res.end();
          return;
        }

        const sub = await chargebeeApi.cancelSubscription(
          postData.subscription_id
        );

        res.status(400);
        res.write(
          JSON.stringify({
            error: false,
            errors: "subscription cancelled successfully",
          })
        );
        res.end();
        return;
      } catch (error) {
        Sentry.captureException({
          error,
          message: "unable to cancel subcription",
        });

        res.status(400);
        res.write(JSON.stringify({ error: false, errors: error }));
        res.end();
        return;
      }
    });
  });

  router.post("/subscription/resume",auth0,async (req, res, next) => {
    let schema = {
      subscription_id: {
        notEmpty: true,
        errorMessage: "subscription id required",
      },
    };
    req.check(schema);

    req.getValidationResult().then(async (validation) => {
      
      let postData = requestHelper.prepareInput(schema, req.body);

      if (!validation.isEmpty()) {
        Sentry.captureException({
          error: JSON.stringify(validation.array()),
          message: "Error Log Cancel Subscription_id",
          data: postData,
        });
        res.status(400);
        res.write(JSON.stringify({ error: true, errors: validation.array() }));
        res.end();
        return;
      }

      try {
        const currentUser = await User.findOne({
          email: req.user.email,
        }).exec();

        if (!currentUser) {
          res.status(500);
          res.write(
            JSON.stringify({ error: true, message: "Usere does not exits" })
          );
          res.end();
          return;
        }

        const sub = await chargebeeApi.resumeSubscription(
          postData.subscription_id
        );

        res.status(400);
        res.write(
          JSON.stringify({
            error: false,
            message: "subscription resumed successfully",
            data:sub
          })
        );
        res.end();
        return;
      } catch (error) {
        Sentry.captureException({
          error,
          message: "unable to resume subcription",
        });

        res.status(400);
        res.write(JSON.stringify({ error: false, errors: error }));
        res.end();
        return;
      }
    });
  });

  router.post("/subscription/pause",auth0,async (req, res, next) => {
    let schema = {
      subscription_id: {
        notEmpty: true,
        errorMessage: "subscription id required",
      },
      interval: {
        notEmpty: true,
        errorMessage: "interval required",
      },
    };
    req.check(schema);

    req.getValidationResult().then(async (validation) => {
      let postData = requestHelper.prepareInput(schema, req.body);

      if (!validation.isEmpty()) {
        Sentry.captureException({
          error: JSON.stringify(validation.array()),
          message: "Error Log Pause Subsciption",
          data: postData,
        });
        res.status(400);
        res.write(JSON.stringify({ error: true, errors: validation.array() }));
        res.end();
        return;
      }

      try {
        const currentUser = await User.findOne({
          email: req.user.email,
        }).exec();

        if (!currentUser) {
          res.status(500);
          res.write(
            JSON.stringify({ error: true, message: "Usere does not exits" })
          );
          res.end();
          return;
        }

        const sub = await chargebeeApi.pauseSubscription(postData);

        res.status(400);
        res.write(
          JSON.stringify({
            error: false,
            message: "subscription paused successfully",
            data:sub
          })
        );
        res.end();
        return;
      } catch (error) {
        Sentry.captureException({
          error,
          message: "unable to pause subscription",
          message: "catch Order",
        });
        res.status(400);
        res.write(JSON.stringify({ error: false, errors: error }));
        res.end();
        return;
      }
    });
  });



  router.get("/payment/methods",auth0,async (req, res, next) => {

    try {
      const user = await User.findOne({
        email: req.user.email,
      }).exec();

      if (user) {
        const paymentSources = await chargebeeApi.listPaymentSources({
          customer_id: user.chargebeeCustomerID,
        });

        const response = {
          success: false,
          data: paymentSources,
        };
        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      } else {
        const response = {
          success: false,
          message: " User does not exists",
        };

        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      }
    } catch (error) {
      Sentry.captureException({
        error,
        message: "unable to get payment sources",
      });

      const response = {
        success: false,
        message: "unable to get payment sources",
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    }


    
  });

  router.get("/payment/method/add/:id",auth0,async (req, res, next) => {

    try {
      const user = await User.findOne({
        email: req.user.email,
      }).exec();

      if (user) {

        const source = await chargebeeApi.createPaymentSource({
          customer_id: user.chargebeeCustomerID,
          cbToken: req.params.id,
        })
        

        const response = {
          success: true,
          source
        };

        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      } else {
        const response = {
          success: false,
          message: " User does not exists",
        };

        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      }
    } catch (error) {

      console.log(error)

      Sentry.captureException({
        error,
        message: "unable to add payment source",
      });

      const response = {
        success: false,
        message: "unable to add payment source",
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    }


    
  });


  router.get("/payment/method/delete/:id",auth0,async (req, res, next) => {

    console.log(req.params.id)

    try {
      const user = await User.findOne({
        email: req.user.email,
      }).exec();

      if (user) {
        
        const paymentSource = await chargebeeApi.deletePaymentSource(req.params.id);

        const response = {
          success: true,
          data: paymentSource,
        };
        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      } else {
        const response = {
          success: false,
          message: " User does not exists",
        };

        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
      }
    } catch (error) {
      Sentry.captureException({
        error,
        message: "unable to delete payment source",
      });

      const response = {
        success: false,
        message: "unable to delete source",
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    }


    
  });


  router.post("/update/billing/cycle",auth0,async (req, res, next) => {

    console.log(req.body)

    try {
      const user = await User.findOne({
        email: req.user.email,
      }).exec();

      if (user) {

        const source = await chargebeeApi.changeTermEnd(req.body.subscription_id,parseInt(req.body.term_end_date));
        const response = {
          success: true,
          source
        };
 
        res.status(200);
        res.write(JSON.stringify(response));
        res.end();

      } else {

        

        const response = {
          success: false,
          message:"User does not exists"
        };
 
        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
         
      }

    } catch (error) {

      console.log(error)
      
      Sentry.captureException({
        error,
        message: "unable to update billing cycle",
      });

      const response = {
        success: false,
        message: "unable to update billing cycle",
      };

      res.status(200);
      res.write(JSON.stringify(response));
      res.end();
    }


    
  });





};




