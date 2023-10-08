import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";

const config = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/index.js",
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(fileURLToPath(import.meta.url), "src"),
        publicPath: "/",
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js"],
    },
    plugins: [
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
    },
};

export default config;
