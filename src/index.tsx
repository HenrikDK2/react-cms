import "./styles/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { store, StoreProvider } from "./redux/store";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
