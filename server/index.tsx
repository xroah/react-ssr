import express from "express";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "../src/components/app";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../src/reducers";

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

            const initialState = {
                todos: [{
                    text: "task1",
                    id: 1,
                    complete: false
                }, {
                    text: "task2",
                    id: 2,
                    complete: true
                }]
            };
            const store = createStore(reducers, initialState);
            const content = renderToString(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            const html = data.toString()
                .replace(/CONTENT_PLACEHOLDER/, content)
                .replace(/INITIAL_STATE_PLACEHOLDER/, `window.__INITIAL_STATE__=${JSON.stringify(initialState)}`);

            res.send(html);
        }
    );
});

app.listen(8188);