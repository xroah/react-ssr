import React from "react";
import { Link } from "react-router-dom";
import getRoutes from "./getRoutes";

export default function App() {
    return (
        <>
            <div>
                <Link to="/home" style={{ marginRight: 20 }}>Home</Link>
                <Link to="/about">About</Link>
            </div>
            {getRoutes()}
        </>
    );
}