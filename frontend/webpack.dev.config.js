const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const sharedRules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'url-loader',
      },
    ],
  },
  {
    test: /\.(woff|woff2|ttf|otf|eot)$/,
    use: [
      {
        loader: 'url-loader',
      },
    ],
  },
]

const client = {
  name: 'client',
  mode: 'development',
  target: 'web',
  entry: [
    path.resolve(__dirname, 'src/client.js'),
    'webpack-hot-middleware/client',
  ],
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'client.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      ...sharedRules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}

const server = {
  name: 'server',
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    m: path.resolve(__dirname, 'src/server/ssr.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      ...sharedRules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}

module.exports = [client, server]
