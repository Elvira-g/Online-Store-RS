const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main:['@babel/polyfill','./index.ts']
    },
    output: {
        filename:'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'json', '.png'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@': path.resolve(__dirname,'src'),
        }
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets/img'), to: path.resolve(__dirname, 'dist/assets/img')}
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: ['file-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 '@babel/preset-env'
            //             ]
            //         }
            //     }
            // },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     loader: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 '@babel/preset-env',
            //                 '@babel/preset-typescript'
            //             ]
            //         }
            //     }
            // }
        ]
    }
}