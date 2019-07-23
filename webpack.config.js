const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const Person = require("babel!./Person.js").default;


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot:true,
    port: 3000,
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'src/index.html',
      template: 'src/index.html'
  }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
      // _: 'underscore'
    })
],
    module:{
      rules:[
          {
            test:/\.html$/,
             use: [
                {
                  loader: 'html-loader',
                  options:{
                  minimize: true
                  }
                },
            ]
          },
          {
            test: /\.css$/i,
            use:[ 'style-loader', 'css-loader']
          },
          {
            test: /\.(scss)$/,
            use: [{
              loader: 'style-loader', // inject CSS to page
            }, 
            {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, 
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'sass-loader' // compiles Sass to CSS
            }]
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {},
              },
            ],
          },
          {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src/js'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: 'env'
            }
          }
        },
      ]
    } 
}