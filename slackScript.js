#!/bin/node
const fs = require("fs");
//Obtain the environment string passed to the node script
const environment = process.argv[2];
//read the content of the json file
try {
  var request = require("request");

  function callback2(err2, res2, result2) {
    // console.log('err2', err2, res2);
    if (!err2 && res2.statusCode === 200) {
      console.log(`slack message sent`);
    }
  }
  var dataString2 = {
    title: `New ${environment} Web and Super Admin Version Released For Mica Beauty`,
    description: `Version Release for env ${environment}`,
    url: environment === 'Production' ? "https://micabeauty.net" : "https://micabeauty-testing.herokuapp.com",
  };

  var options2 = {
    url: "https://techloset-server.herokuapp.com/slack/micabeauty",
    method: "POST",
    json: dataString2,
  };

  request(options2, callback2);
} catch (err) {
  console.log("err", err);
}
