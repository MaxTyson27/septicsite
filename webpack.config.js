const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack')

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    configObj.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return configObj
}

const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/index.pug'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist'), }
      ]
    }),
  ]

  if (isProd) {
    basePlugins.push(
      new ImageminPlugin({
        bail: false,
        cache: true,
        imageminOptions: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  {
                    removeViewBox: false
                  }
                ]
              }
            ]
          ]
        }
      })
    )
  }

  return basePlugins
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    hot: true,
    open: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: true
    }
  },
  optimization: optimization(),
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /(node_modules)/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }

          }
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.png|jpg|jpeg|svg|gif$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        }
      },
      {
        test: /\.woff|woff2$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        }
      }
    ],
  }
}