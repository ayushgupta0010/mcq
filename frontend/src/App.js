import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./components/MainComponent";

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
