const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            // {
            //     test: /\.ts?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'widget.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
        })
    ],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
};