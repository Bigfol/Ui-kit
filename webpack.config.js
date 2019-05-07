const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');

//const extractLESS = new ExtractTextPlugin('style.css');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                include: path.resolve(__dirname, 'src/less'),
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        //extractLESS,
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './style.css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pug/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'page.html',
            template: './src/pug/page.pug'
        })
    ]
};