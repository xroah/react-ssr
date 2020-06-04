import React, { useState } from "react";

export default function App() {
    let [count, updateCount] = useState(0);
    const onClick = () => {
        updateCount(++count);
    }

    return (
        <div>
            <button onClick={onClick}>Add</button>
            <p>{count}</p>
        </div>
    );
}