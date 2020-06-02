const path = require("path");

const CreateFileWebpack = require("create-file-webpack");
const Dotenv = require("dotenv-webpack");

const server = {
  name: "server",
  mode: "production",
  target: "node",
  entry: [path.resolve(__dirname, "./src/backend/server.js")],
  output: {
    path: path.resolve(__dirname, "dist/lambda-backend"),
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
      path: "./dist/lambda-backend",
      fileName: "package.json",
      content: `{"name": "lambda-function", "version": "1.0.0"}`,
    }),
    new Dotenv(),
  ],
};

module.exports = server;
