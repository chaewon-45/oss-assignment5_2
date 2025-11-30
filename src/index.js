import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";   // Router ❌ App에서 이미 Router 사용중

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
