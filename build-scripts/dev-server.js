import express from "express";
import path from "node:path";
import open from "open";
import { fileURLToPath } from "url";

const port = 3000;

const app = express();

app.get("/", (req, res) => {
    const filename = fileURLToPath(import.meta.url);
    res.sendFile(path.join(path.dirname(filename), "../src/index.html"));
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        open("http://localhost:" + port);
    }
});
