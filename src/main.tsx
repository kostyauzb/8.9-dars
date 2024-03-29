import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      duration={2000}
      richColors
      visibleToasts={1}
    />
    <App />
  </React.StrictMode>
);
