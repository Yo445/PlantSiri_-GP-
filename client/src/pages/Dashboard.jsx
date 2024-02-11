import React, { useState, useEffect } from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Typography,
} from "@mui/material";

import {
  WifiOffOutlined,
  HeatPumpOutlined,
  OilBarrelOutlined,
} from "@mui/icons-material";

import Liquidgauge from "../components/Liquidgauge";
import Gridbox from "../components/Gridbox";

// socket.io-client
import io from "socket.io-client";
const urlSend = window.location.origin;

function Dashboard() {
  const theme = useTheme();
  const isNonScreens1200 = useMediaQuery("(min-width: 1200px)");
  const isNonScreens576 = useMediaQuery("(min-width: 576px)");
  const [disableButton, setDisableButton] = useState(false);

  // socket.io-client
  const [arduinoData, setArduinoData] = useState({
    sensorhcsr04: [],
    pumpstatus: [],
    pumpstartmanual: [],
    pumpstopmanual: [],
    resetboard: [],
  });

  useEffect(() => {
    const socket = io.connect(urlSend);
    socket.on("arduinopump", (data) => {
      setArduinoData({
        sensorhcsr04: data.sensorhcsr04,
        pumpstatus: data.pumpstatus,
        pumpstartmanual: data.pumpstartmanual,
        pumpstopmanual: data.pumpstopmanual,
        resetboard: data.resetboard,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box m="2rem 2rem" display="flex" justifyContent="center">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonScreens1200 ? undefined : "span 12" },
        }}
        justifyContent="center"
      >
        <Box gridColumn="span 12" gridRow="span 1">
          <Typography
            variant="h3"
            color={theme.palette.fontcustomcolor.default}
          >
            Water Level
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gridColumn="span 4"
          gridRow="span 6"
          backgroundColor={theme.palette.background.white}
          borderRadius="0.5rem"
          sx={{ border: `1px solid ${theme.palette.bordercolor.default}` }}
        >
          <Liquidgauge
            value={arduinoData.sensorhcsr04.distanceinpercen}
            radius={isNonScreens576 ? 200 : 150}
          />
        </Box>

        <Gridbox
          title="Pump Status :"
          // value={String(arduinoData.pumpstatus.state)}
          value={arduinoData.pumpstatus.state ? "On" : "Off"}
          icon={<HeatPumpOutlined />}
        ></Gridbox>
        <Gridbox
          title="Wifi Connection :"
          value={arduinoData.sensorhcsr04.wificonnect}
          icon={<WifiOffOutlined />}
        ></Gridbox>
        <Gridbox
          title="Distance in % :"
          value={arduinoData.sensorhcsr04.distanceinpercen}
          icon={<OilBarrelOutlined />}
        ></Gridbox>
        <Gridbox
          title="Distance in mm :"
          value={arduinoData.sensorhcsr04.distance}
          icon={<OilBarrelOutlined />}
        ></Gridbox>

        <Box
          display="flex"
          gridColumn="span 8"
          gridRow="span 4"
          flexDirection="column"
          backgroundColor={theme.palette.background.white}
          borderRadius="0.5rem"
          sx={{ border: `1px solid ${theme.palette.bordercolor.default}` }}
          p="1rem"
        >
          <Typography
            variant="h6"
            mb="1rem"
            sx={{ color: theme.palette.fontcustomcolor.default }}
            fontSize="18px"
          >
            Controller Board
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="1rem"
            gap={5}
          >
            <Button
              disabled={disableButton}
              variant="contained"
              size="large"
              sx={{ fontSize: "18px"}}
              onClick={() => {
                io.connect(urlSend).emit("pumpmanual", {
                  path: "pumpstartmanual",
                  state: true,
                });

                // Disable the button and set a timeout to re-enable it after 2 seconds
                setDisableButton(true);
                setTimeout(() => {
                  setDisableButton(false);
                }, 2000);
              }}
            >
              {isNonScreens576 ? "Start Pump" : "STA"}
            </Button>
            <Button
              disabled={disableButton}
              variant="contained"
              size="large"
              sx={{ fontSize: "18px" }}
              onClick={() => {
                io.connect(urlSend).emit("pumpmanual", {
                  path: "pumpstopmanual",
                  state: true,
                });

                // Disable the button and set a timeout to re-enable it after 2 seconds
                setDisableButton(true);
                setTimeout(() => {
                  setDisableButton(false);
                }, 2000);
              }}
            >
              {isNonScreens576 ? "Stop Pump" : "STP"}
            </Button>
            <Button
              disabled={disableButton}
              variant="contained"
              size="large"
              sx={{ fontSize: "18px" }}
              onClick={() => {
                io.connect(urlSend).emit("pumpmanual", {
                  path: "resetboard",
                  state: true,
                });

                // Disable the button and set a timeout to re-enable it after 2 seconds
                setDisableButton(true);
                setTimeout(() => {
                  setDisableButton(false);
                }, 2000);
              }}
            >
              {isNonScreens576 ? "Restart Board" : "RES"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
