const { ApolloServer, gql } = require("apollo-server-express");
import http from "http";
import express,{json} from "express";
import bodyParser from 'body-parser';
import chargebee from 'chargebee'
import recurlyApi from '../helpers/recurly';
import adminRoutes from '../routes';
var path = require('path');
 

import {
  SuperAdminType,
  Mutations,
  Resolvers,
  Queries,
  OrderType,
  adminType,
  formulaType,
  productType,
  settingType,
  supportType,
  userType,
  addressType,
  Subscription,
  layoutOneType,
  layoutTwoType,
  layoutThreeType,
} from "../graphql";
import { DBConnect } from "../database";
import { getUser } from "../helpers/getUserMiddleware";
import Sentry from "../config/sentry";
import glob from "glob";
import expressValidator from "express-validator";
import { auth0 } from "../helpers/auth0Middleware";
import { postgresClient } from "../database/db/postgresConnect";

const app = express();

app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(json({ limit: '200mb' }));

const typeDefs = gql`
  # models
  ${SuperAdminType}
  ${OrderType}
  ${adminType}
  ${formulaType}
  ${productType}
  ${settingType}
  ${supportType}
  ${userType}
  ${addressType}
  ${layoutOneType}
  ${layoutTwoType}
  ${layoutThreeType}
  # the schema allows the following query:
  ${Queries}
  # this schema allows the following mutation:
  ${Mutations}
  # this schema allows the subscription real time db
  ${Subscription}
`;

const resolvers = {
  ...Resolvers,
};

app.use(
  '/auth',
  auth0.unless({
    path: ['/admin','/test','/graphql'],
  }),
);

app.use(function (err, req, res, _) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Authentication Failed');
  }
  console.log(err)
  res.status(500).send('Internal Server Error');
});

DBConnect()
  .then(async () => {
    // Init Chargebee
    chargebee.configure({
      site :  process.env.CHARGEBEE_SITE, 
      api_key : process.env.CHARGEBEE_API_KEY,
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, connection }) => {
        if (connection) {
          return connection.context;
        } else {
          const token = req.headers.authorization || "";
          const email = req.headers.email || null;
          let versionCode = req.headers?.versioncode || null;
          if (versionCode) {
            versionCode = JSON.parse(req.headers?.versioncode || "{}")
          }
          // Sentry.captureException({message:"token from client", token, email})
          let user = getUser(token, email);
          return { user:user, versionCode};
        }
      },
      introspection: false,
      playground: false,
    });
    
    server.applyMiddleware({ app });
    const httpServer = http.createServer(app);

    app.get("/test", (req, res) => {
      recurlyApi.checkoutPurchase()
      res.status(200).json("server is working fine here..");
    });

    app.use(expressValidator());
    app.use("/admin", adminRoutes);

    const services = glob.sync(path.normalize(__dirname + '/..') + '/services//*.js');
    services.forEach(function (service) {
      require(service)(app);
    });

    app.use(express.static("public"));

    app.get("*", function (req, res) {
      res.sendFile("index.html", { root: "public" });
    });

    server.installSubscriptionHandlers(httpServer);
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, async () => {

      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
      );
    });

    //postgresClient.init()
  })
  .catch((error) => {
    console.log("an error occured while starting DB  : ", error);
  });
