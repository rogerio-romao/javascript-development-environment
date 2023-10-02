import path from "path";
import { fileURLToPath } from "url";

export default {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(fileURLToPath(import.meta.url), "src"),
        publicPath: "/",
        filename: "bundle.js",
    },
    plugins: [],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
    },
};
