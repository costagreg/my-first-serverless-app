const path = require('path')
const CreateFileWebpack = require('create-file-webpack')

module.exports = {
  name: 'server',
  mode: 'development',
  target: 'node',
  entry: [
    path.resolve(__dirname, './src/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/lambda'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CreateFileWebpack({
      path: './dist/lambda',
      fileName: 'package.json',
      content: `{"name": "lambda-function", "version": "1.0.0"}`,
  })
  ]
};