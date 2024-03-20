import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    customblue: {
      main: "#2a7ebc",
    },
    background: {
      default: "rgb(250, 250, 251)",
      white: "#ffffff",//#fafdf4
    },
    fontcustomcolor: {
      default: "rgb(38, 38, 38)",
      second: "rgb(68, 89, 110)",
    },
    bordercolor: {
      default: "rgb(240, 240, 240)", //#7FB8A4 //#23d3eb
    },
    themecolor: {
      default: "rgb(24, 144, 255)", //#23d3eb //rgb(24, 144, 255)
    },
  },
  typography: {
    fontFamily: ["Public Sans", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },
  },
});
