import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./reducers"



render(
  <Provider store={store}
  // store={store}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
