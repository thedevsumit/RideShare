import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import itemStore from "./store/index.js";
import './index.css';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={itemStore}>
      <App />
    </Provider>
  </StrictMode>
);
