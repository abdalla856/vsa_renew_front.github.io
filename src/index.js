import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from "redux";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
