var path = require("path");
var webpack = require("webpack");

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin("shared.js");

module.exports = {
    context: path.resolve("public/js"),
    entry: "./entry",
    output: {
        path: path.resolve("build/"),
        //publicPath: "/",
        filename: "bundle.js"
    },

    module: {
        // preLoaders: [{
        //     test: /\.js$/,
        //     exclude: /node_modules/,
        //     loader: "jshint-loader"
        // }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components|server.js)/,
            loader: 'babel'
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'raw'
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=10000' // => DataUrl if "file.png" is smaller that 10kb
        },{
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!sass'
      }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.BannerPlugin("******************\nCreated By Hemant\n******************")
    ]
};
