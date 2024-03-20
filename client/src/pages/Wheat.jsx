import React from "react";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { theme } from "./theme";
import CardsW from "./CardsW";
import DashboardW from "./DashboardW";

function Wheat() {
  return (
    <div className="app">
      {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <DashboardW />
        <CardsW />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default Wheat;
