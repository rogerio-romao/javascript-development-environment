import path from "path";
import { fileURLToPath } from "url";

const config = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/index.js",
    output: {
        // disable eslint for the next line
        // eslint-disable-next-line no-undef
        path: path.resolve(fileURLToPath(import.meta.url), "src"),
        publicPath: "/",
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js"],
    },
    plugins: [],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
    },
};

export default config;
