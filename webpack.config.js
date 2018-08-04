const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  devtool: 'inline-source-map',
  entry: './src/app/app.module.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: {
      index: './dist/index.html'
    }
  },
  plugins: [
    // new UglifyJsPlugin({
     //   test: /\.js($|\?)/i;'/
    // }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.template.ejs',
      minifiy: true
    }),
    // new FaviconsWebpackPlugin('./src/assets/images/canadian-icon.png'),
    new ResourceHintWebpackPlugin()
  ],
  module: {
    noParse: [
      /[/\\]node_modules[/\\]angular[/\\]angular\.js$/
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.(png|ico|svg|jpg|gif|eot|ttf|woff|woff2)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};

module.exports = config;
