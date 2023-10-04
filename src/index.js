import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import NFTMarketplace from "views/admin/marketplace";

import { BrowserRouter } from "react-router-dom";
import Profile from "pages/Profile";
import SignIn from "pages/SignIn";
import { Provider } from "react-redux";
import { store } from "rtk/store";
import SignUp from "pages/SignUp";
import Home from "pages/Home";
import App from "App";
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      {/* <ThemeEditorProvider> */}
      {/* <HashRouter> */}
      <Provider store={store}>
        <BrowserRouter>
         <App/>
        </BrowserRouter>
      </Provider>
      {/* <Switch> */}
      {/* <Redirect from="/" to="/auth#/auth" /> */}
      {/* <Route path={`/#/auth#/auth`} component={SignIn} />
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/rtl`} component={RtlLayout} /> */}
      {/* </Switch> */}
      {/* </HashRouter> */}
      {/* </ThemeEditorProvider> */}
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
