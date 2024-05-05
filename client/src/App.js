import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div >
      <ThemeProvider theme={theme}>
      <Navbar />
      <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
