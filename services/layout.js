import layoutOneSchema  from "../database/schemas/layoutOneSchema";
import layoutThreeSchema  from "../database/schemas/layoutOneSchema";
import express from "express";

const router = express.Router();

module.exports = function (app) {

        app.use('/api/layout', router);
        router.get('/one', async (req, res, next) => {

            try {
                let layoutOne = await layoutOneSchema.find({});
                res.status(200);
                res.write(JSON.stringify(layoutOne));
                res.end();

              } catch (error) {
                throw new Error(error);
              }

        });

        router.get('/three', async (req, res, next) => {

          try {
              let layoutThree = await layoutThreeSchema.find({});

              res.status(200);
              res.write(JSON.stringify(layoutThree));
              res.end();

            } catch (error) {
              throw new Error(error);
            }

      });
 }