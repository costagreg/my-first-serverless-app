const path = require("path");

const CreateFileWebpack = require("create-file-webpack");
const Dotenv = require("dotenv-webpack");

const client = {
  name: "client",
  mode: "development",
  target: "web",
  entry: [path.resolve(__dirname, "./src/client.js")],
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "client.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

const server = {
  name: "server",
  mode: "development",
  target: "node",
  entry: [path.resolve(__dirname, "./src/server/serverless.js")],
  output: {
    path: path.resolve(__dirname, "dist/lambda"),
    filename: "server.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CreateFileWebpack({
      path: "./dist/lambda",
      fileName: "package.json",
      content: `{"name": "lambda-function", "version": "1.0.0"}`,
    }),
    new Dotenv(),
  ],
};

module.exports = [client, server];
