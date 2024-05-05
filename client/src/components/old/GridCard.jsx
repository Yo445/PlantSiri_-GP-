import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import CircularBar from "./CircularBar";

const GridCard = ({ title, color, value, icon, imgUrl, unit }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column" // Set flex direction to column
      justifyContent="space-between"
      gridRow="span 6"
      borderRadius="1rem"
      p="1rem 1rem"
      // backgroundColor={theme.palette.background.white}
      sx={{
        border: "0.5px solid black",
        width: "330px",
        alignContent: "center",
        height: "330px",
        margin: "15px",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h6"
          mb="1rem"
          sx={{ color: theme.palette.fontcustomcolor.default }}
          alignItems="center"
          fontSize="25px"
        >
          {title}
        </Typography>
        {icon}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gridColumn="span 4"
        gridRow="span 6"
        // backgroundColor={theme.palette.background.white}
        borderRadius="0.5rem"
        sx={{
          width: "230px", // Adjust the width as needed
          height: "130px", // Adjust the height as needed
          margin: "auto",
          //textAlign:"center"
        }}
      >
        <CircularBar value={value} unit={unit} color={color} />
      </Box>
    </Box>
  );
};

export default GridCard;
