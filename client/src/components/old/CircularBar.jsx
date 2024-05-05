import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Typography, useTheme } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";

function CircularProgressBar({
  value,
  color,
  unit, // Add unit prop here
}) {
  const theme = useTheme();

  return (
    <CircularProgressbarWithChildren
      value={value}
      unit={unit}
      styles={{
        path: { stroke: color },
      }}
    >
      <Typography
        variant="h1"
        mb="0.5rem"
        fontWeight="600"
        sx={{ color: theme.palette.fontcustomcolor.second }}
        textAlign="center"
      >
        {value}
        {unit} 
      </Typography>
    </CircularProgressbarWithChildren>
  );
}

export default CircularProgressBar;
