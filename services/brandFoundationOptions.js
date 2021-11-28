import brandFoundationSchema  from "../database/schemas/brandFoundationSchema";
import express from "express";

const router = express.Router();

module.exports = function (app) {
  app.use('/api', router);
  router.get('/brand-foundation-options', async (req, res, next) => {
    try {
      let brandFoundationOptions = await brandFoundationSchema.find({});

      res.status(200);
      res.write(JSON.stringify(brandFoundationOptions));
      res.end();

    } catch (error) {
      throw new Error(error);
    }
  });
}