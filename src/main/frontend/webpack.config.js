var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUID_DIR = path.resolve(__dirname + "../../../../target/classes/static");

console.log("BUID_DIR " + BUID_DIR)

module.exports = {
    entry: {
        app: path.resolve(__dirname, './app/index.js')
    },
    resolve:{
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: path.join(__dirname, "."),
                exclude: path.resolve(__dirname, "node_modules"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                }

            }
        ]
    },
    output: {
        filename: '[name]_bundle.js',
        path: BUID_DIR
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,  "../resources/static/index.html")
        })
    ]
};