import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Analysis from "./pages/Analysis/Analysis";
import { theme } from "./theme";
function Layout() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Navbar />
      {/* <Analysis /> */}
      <Outlet />
      </ThemeProvider>
  );
}

export default Layout;
