import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "marx-css/css/marx.min.css";
import "./App.css";
import { loginUserSuccess } from "./features/user/userSlice";
import api from "./app/api";
import jwt_decode from "jwt-decode";

if (localStorage.getItem("token")) {
  const user = jwt_decode(localStorage.getItem("token"));
  store.dispatch(loginUserSuccess(user.username));
  api.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
