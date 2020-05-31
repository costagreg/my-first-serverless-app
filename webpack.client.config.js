const path = require('path')

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  entry: [
    path.resolve(__dirname, './src/client.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'client.js',
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
  }
};