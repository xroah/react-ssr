import React from "react";
import App from "./components/app"
import { Provider } from "react-redux";
import reducers from "./reducers";
import { createStore } from "redux";
import { hydrate } from "react-dom";

const store = createStore(
    reducers,
    typeof window !== "undefined" ? (window as any).__INITIAL_STATE__ : {}
);

hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)