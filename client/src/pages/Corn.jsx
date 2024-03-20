import React from "react";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { theme } from "./theme";
import CardsC from "./CardsC";
import DashboardC from "./DashboardC";

function Corn() {
  return (
    <div className="app">
      {/* <ThemeProvider theme={theme}> */}
      {/* <CssBaseline /> */}
      <DashboardC />
      <CardsC />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default Corn;
