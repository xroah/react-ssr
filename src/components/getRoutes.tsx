import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Page404 from "./404";

const routes = [{
    path: "/home",
    component: Home
}, {
    path: "/about",
    component: About
}, {
    path: "/404",
    component: Page404
}];

export default function getRoutes() {
    return (
        <Switch>
            {
                routes.map(
                    r => <Route
                        key={r.path}
                        path={r.path}
                        exact
                        component={r.component} />
                )

            }
            <Redirect to="/404" />
        </Switch>
    )
}