import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Typography, useTheme } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";

function CircularProgressBar({
  value,
  color,
  imgUrl,
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
      <img style={{ width: 55, marginTop: -5 }} src={imgUrl} alt="doge" />
      <Typography
        variant="h1"
        mb="1.5rem"
        fontWeight="600"
        sx={{ color: theme.palette.fontcustomcolor.second }}
        textAlign="center"
      >
        {value}
        {unit} {/* Render unit here */}
      </Typography>
    </CircularProgressbarWithChildren>
  );
}

export default CircularProgressBar;
