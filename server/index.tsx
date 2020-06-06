import express from "express";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "../src/components/app";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../src/reducers";
import { StaticRouter } from "react-router-dom";

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
            const context: any = {};
            const content = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            );

            if (context.url) {
                return res.redirect(302, context.url);
            }

            const html = data.toString()
                .replace(/CONTENT_PLACEHOLDER/, content)
                .replace(/INITIAL_STATE_PLACEHOLDER/, `window.__INITIAL_STATE__=${JSON.stringify(initialState)}`);

            res.send(html);
        }
    );
});

app.listen(8188);