const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

const CreateFileWebpack = require('create-file-webpack')
const Dotenv = require('dotenv-webpack')

const server = {
  name: 'server',
  mode: 'development',
  target: 'node',
  entry: [path.resolve(__dirname, './src/server-dev.js')],
  output: {
    path: path.resolve(__dirname, './dist/dev/'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CreateFileWebpack({
      path: './dist/lambda',
      fileName: 'package.json',
      content: `{"name": "lambda-function", "version": "1.0.0"}`,
    }),
    new Dotenv({ path: path.resolve(__dirname, './.env') }),
    new NodemonPlugin(),
  ],
}

module.exports = server
