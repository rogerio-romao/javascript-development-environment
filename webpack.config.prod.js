import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { fileURLToPath } from "url";

const config = {
    mode: "production",
    devtool: "source-map",
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js",
    },
    output: {
        // disable eslint for the next line
        // eslint-disable-next-line no-undef
        path: path.resolve(fileURLToPath(import.meta.url), "../dist"),
        publicPath: "/",
        filename: "[name].[contenthash].js",
    },
    resolve: {
        extensions: [".js"],
    },
    plugins: [
        // Extract CSS into separate files
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
};

export default config;
