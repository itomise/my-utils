const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common').webpack_config
const PUBLIC_URL = require('./webpack.common').PUBLIC_URL
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: PUBLIC_URL,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              data: {
                PUBLIC_URL: PUBLIC_URL,
                env: 'develop',
              },
            },
          },
        ],
      },
    ],
  },
})

// entryにhot-middlewareを追加する
for (const key in config.entry) {
  const orgPath = config.entry[key]
  config.entry[key] = [
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    path.resolve(__dirname, orgPath),
  ]
}

module.exports = config
