/* eslint-disable no-console */
import express from "express";
import { rateLimit } from "express-rate-limit";
import path from "node:path";
import open from "open";
import { fileURLToPath } from "url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../webpack.config.dev.js";

const port = 3000;

const app = express();

// security best practices
app.disable("x-powered-by");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
});

const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.get("/", limiter, (_req, res) => {
    const filename = fileURLToPath(import.meta.url);
    res.sendFile(path.join(path.dirname(filename), "../src/index.html"));
});

app.get("/users", (_req, res) => {
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
    if (err) console.error(err);
    else open("http://localhost:" + port);
});
