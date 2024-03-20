import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

import { RouterProvider } from "react-router-dom";
import router from "./Routes";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
