const AWS = require("aws-sdk");

const express = require("express");
const logger = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

const indexRoutes = require("./routes/index.js");
const awsRegion = process.env.AWS_REGION || "us-east-1";

AWS.config.update({
  region: awsRegion,
  endpoint: "http://localhost:8000",
});

const documentClient = new AWS.DynamoDB.DocumentClient();

app.use(logger("dev"));

app.use(indexRoutes(documentClient));

app.listen(port, () => {
  console.log("Server started on port:" + port);
});
