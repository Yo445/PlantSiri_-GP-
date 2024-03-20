import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, useTheme } from "@mui/material";
import { LuWheat } from "react-icons/lu";
import { GiCorn } from "react-icons/gi";

import Logo from "./logo1.svg";

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: "#e3f0c9",
        borderBottomRadius: "15px",
        maxHeight: "100px",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          background: "edf6db",
          minHeight: "85px !important",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center">
          <Link
            to="/Analysis"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={Logo}
              alt="PlantSiri Logo"
              style={{ width: "100px", marginRight: "10px" }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "cursive", fontSize: "24px" }}
            >
              PlantSiri
            </Typography>
          </Link>
          <Link
            to="/Wheat"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.3s ease",
            }}
          >
            <LuWheat
              style={{ color: "#7ba132", fontSize: "38px", marginRight: "5px" }}
            />
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              Wheat
            </Typography>
          </Link>
          <Link
            to="/Corn"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.3s ease",
            }}
          >
            <GiCorn
              style={{ color: "#7ba132", fontSize: "42px", marginRight: "5px" }}
            />
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              Corn
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
