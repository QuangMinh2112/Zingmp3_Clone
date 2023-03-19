import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import { GlobalStyle } from "./components";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxConfig from "./redux";
import { PersistGate } from "redux-persist/integration/react";
const { store, persistor } = reduxConfig();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyle>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </GlobalStyle>
);
