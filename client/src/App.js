import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import i18n from  './i18n/i18n.jsx'; // import the i18n configuration
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Outlet />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
