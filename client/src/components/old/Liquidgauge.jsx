import React from "react";
import { useTheme } from "@mui/material";
import { color } from "d3-color";

import LiquidFillGauge from "react-liquid-gauge";

function Liquidgauge({ value =65, radius = "150", unit = "%" }) {
  const theme = useTheme();

  return (
    <LiquidFillGauge
      style={{ margin: "0 auto" }}
      width={radius * 2}
      height={radius * 2}
      value={value}
      percent={unit}
      textSize={1}
      textOffsetX={10}
      textOffsetY={30}
      riseAnimation
      waveAnimation
      waveFrequency={2}
      waveAmplitude={1}
      gradient
      outerRadius={0.94}
      circleStyle={{
        fill: theme.palette.themecolor.default,
      }}
      waveStyle={{
        fill: theme.palette.themecolor.default,
      }}
      textStyle={{
        fill: color("#444").toString(),
        fontFamily: "Arial",
      }}
      waveTextStyle={{
        fill: color("#fff").toString(),
        fontFamily: "Arial",
      }}
    />
  );
}

export default Liquidgauge;
