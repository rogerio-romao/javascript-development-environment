/* eslint-disable no-console */
import express from "express";
import path from "node:path";
import open from "open";
import { fileURLToPath } from "url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../webpack.config.dev.js";

const port = 3000;

const app = express();

// security best practice
app.disable("x-powered-by");

const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.get("/", (req, res) => {
    const filename = fileURLToPath(import.meta.url);
    res.sendFile(path.join(path.dirname(filename), "../src/index.html"));
});

app.get("/users", (req, res) => {
    res.json([
        { id: 1, firstName: "Bob", lastName: "Smith", email: "bob@gmail.com" },
        {
            id: 2,
            firstName: "Tammy",
            lastName: "Norton",
            email: "tnorton@yahoo.com",
        },
        {
            id: 3,
            firstName: "Tina",
            lastName: "Lee",
            email: "lee.tina@hotmail.com",
        },
    ]);
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        open("http://localhost:" + port);
    }
});
