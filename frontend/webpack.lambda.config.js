const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CreateFileWebpack = require("create-file-webpack");
const Dotenv = require("dotenv-webpack");


const sharedRules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
  {
    test: /\.(woff|woff2|ttf|otf|eot)$/,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
]

const client = {
  name: "client",
  target: "web",
  entry: [path.resolve(__dirname, "./src/client.js")],
  output: {
    path: path.resolve(__dirname, "./dist/assets"),
    filename: "client.js",
  },
  module: {
    rules: [
      ...sharedRules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: "null-loader",
      },
    ],
  },
};

const server = {
  name: "server",
  target: "node",
  entry: [path.resolve(__dirname, "./src/server/serverless.js")],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "lambda/server.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      ...sharedRules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'isomorphic-style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './assets/styles.css'
    }),
    new CreateFileWebpack({
      path: "./dist/lambda",
      fileName: "package.json",
      content: `{"name": "lambda-function", "version": "1.0.0"}`,
    }),
    new Dotenv({ path: path.resolve(__dirname, "../.env") }),
  ],
};

module.exports = [client, server];
