const express = require("express");

const routes = (documentClient) => {
  const router = express.Router();
  const tableName = process.env.TABLE_NAME || 'DEV_TABLE'


  router.get("/api/", function (req, res, next) {
    res.send("response test");
  });

  router.get("/api/urls", (req, res) => {
    var params = {
      TableName: tableName,
      ProjectionExpression: "#Id,#Name",
      ExpressionAttributeNames: {
        "#Id": "Id",
        "#Name": "Name",
      },
    };

    documentClient.scan(params, function (err, data) {
      if (err) {
        res.send({
          success: false,
          message: err,
        });
      } else {
        const { Items } = data;
        res.send({
          success: true,
          message: "Test response",
          fruits: Items,
        });
      }
    });
  });

  return router;
};

module.exports = routes;
