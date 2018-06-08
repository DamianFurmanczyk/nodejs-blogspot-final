const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

// 🔥🔥🔥🔥🔥

const js = {
  test: /\.(js)$/,
  use: [
    {
      loader: "babel-loader",
      options: { presets: ["es2015"] }
    }
  ]
};

const postcss = {
  loader: "postcss-loader",
  options: {
    plugins() {
      return [autoprefixer({ browsers: "last 3 versions" })];
    }
  }
};

module.exports = {
  entry: "./indexWebpack.js",

  output: {
    path: path.join(__dirname, "static"),
    filename: "main.js"
  },

  module: {
    loaders: [
      {
        test: /\.(styl)$/,
        use: ExtractTextPlugin.extract([
          "css-loader?sourceMap:true",
          postcss,
          "stylus-loader?sourceMap:true"
        ])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  target: "node",

  plugins: [new UglifyJSPlugin(), new ExtractTextPlugin("style.css")]
};
