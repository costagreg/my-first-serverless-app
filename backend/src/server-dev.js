const express = require("express");
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 5000;

const indexRoutes = require('./routes/index.js')

app.use(logger('dev'));

app.use(indexRoutes);

app.listen(port, () => {
  console.log("Server started on port:" + port);
});
