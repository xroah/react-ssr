import express from "express";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "../src/components/app";

const app = express();

app.use(
    express.static(
        path.resolve(__dirname, "../dist"),
        { index: false }
    )
);

app.use((req, res) => {
    fs.readFile(
        path.resolve(__dirname, "../dist/index.html"),
        (err, data) => {
            if (err) throw err;

            const content = renderToString(<App />);
            const html = data.toString().replace(/\${content}/, content);
            console.log(html)
            res.send(html);
        }
    );
});

app.listen(8188);