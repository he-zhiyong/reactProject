var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: {
        index: [
            path.resolve(__dirname, 'src/index.js'),
        ] 
    },
    output: {
        path:path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            include: path.resolve(__dirname, 'src'),
            loader: "babel-loader",
        },{
            test: /\.html$/,
            include: path.resolve(__dirname, 'src'),
            loader: "html-loader",
        },{
            test: /\.css/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [ 
                            require('postcss-import'),
                            require('autoprefixer')
                        ]
                    }
                }
            }]
        },{
            test: /\.less/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [ 
                            require('autoprefixer')
                        ]
                    }
                }
            },{
                loader: 'less-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html'),
            inject: 'body',
            title: "webpack demo",
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;