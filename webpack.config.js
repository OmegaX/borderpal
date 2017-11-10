const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: "inline-source-map",
  entry: './src/app/app.module.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    historyApiFallback: {
      index: './dist/index.html'      
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Managements',
      template: './src/index.template.ejs',
      inject: 'html',
    }),
  ],
  module: {
    noParse: [
      /[\/\\]node_modules[\/\\]angular[\/\\]angular\.js$/
    ],
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
      },   
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {

      'loader': 'babel-loader',
      'test': /\.js$/,
      'exclude': /node_modules/,
      'query': {
        'plugins': ['lodash'],
        'presets': [['env', { 'targets': { 'node': 4 } }]]
      }

      }
    ],

  },
};

module.exports = config;