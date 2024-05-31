import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DisplayCard from "../../../components/DisplayCard";
import { Box } from "@mui/material";
import "./Display.css";
import { MdTimer, MdAccessTime } from "react-icons/md";
import ShowerIcon from '@mui/icons-material/Shower';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import Gauage from "../../../components/Gauage";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";

const DisplaySensor = ({ sensorData }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const endTime = new Date(sensorData.end_date).getTime();
      const remaining = endTime - currentTime;
      setRemainingTime(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [sensorData.end_date]);

  // Function to convert milliseconds to minutes and seconds
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 600000));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Function to format values to two digits after the dot
  const formatValue = (value) => {
    return parseFloat(value).toFixed(2);
  };

  return (
    <div className="display-content">
      {/* Header */}
      <Container>
        <Row>
          <h1 >{sensorData.sensor_id}<span>{sensorData.CropType}</span></h1>
        </Row>
      </Container>
      {/* Cards */}
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {/* Date */}
        <DisplayCard
          title="Date"
          icon={<MdAccessTime />}
        >
          <div>
            <h5>Start</h5>
            <h1 style={{color:"darkseagreen"}}>{sensorData.start_date}</h1>
            <hr />
            <h5>End</h5>
            <h1 style={{color:"darkseagreen"}}>{sensorData.end_date}</h1>
          </div>
        </DisplayCard>

        {/* Remaining Time */}
        <DisplayCard
          title="Remaining Time"
          icon={<MdTimer />}
        >
          <div>
            <h1 style={{ fontSize: "50px", color:"#467aa6"}}>{formatTime(remainingTime)}</h1>
            <p style={{ fontSize: "24px",  textAlign: "center", marginTop: "0", marginBottom: "5px", color:"#467aa6" }}>min:sec</p>
          </div>
        </DisplayCard>

        {/* Irrigation Status */}
        <DisplayCard
          title="Irrigation status"
          icon={<ShowerIcon fontSize="large" />}
        >
          <h1 style={{ color: sensorData.Status === "!Not Irrigated" ? "darkolivegreen" : "aquamarine" }}>
            {sensorData.Status}
          </h1>
        </DisplayCard>

        {/* Duration */}
        <DisplayCard
          title="Duration"
          icon={<FontAwesomeIcon fontSize="small" icon={faHourglassHalf} />}
        >
          <div>
            <h5>Irrigation Duration</h5>
            <h1 style={{color:"beige"}}>{sensorData.IrrigationDuration}</h1>
            <hr />
            <h5>Cycle</h5>
            <h1 style={{color:"beige"}}>{sensorData.Cycle}</h1>
          </div>
        </DisplayCard>

        {/* Cycle Status */}
        <DisplayCard
          title="cycle status"
          icon={<RunningWithErrorsIcon />}
        >
          <h1 className="cycle_status">{sensorData.cycle_status}</h1>
        </DisplayCard>

        {/* Temperature */}
        <DisplayCard
          title="Temperature"
          icon={<FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "17px" }} />}
        >
          <Gauage
            units={'°C'}
            value={formatValue(sensorData.Tmax)}
            strokeColor="#892323"
          />
        </DisplayCard>

        {/* Humidity */}
        <DisplayCard
          title="Humidity"
          icon={<WiHumidity style={{ fontSize: "24px" }} />}
        >
          <Gauage
            units={'%'}
            value={formatValue(sensorData.RH_max)}
            strokeColor="rebeccapurple"
          />
        </DisplayCard>

        {/* Wind Speed */}
        <DisplayCard
          title="Wind Speed"
          icon={<LuWind fontSize="19px" />}
        >
          <Gauage
            units={'m/s'}
            value={formatValue(sensorData.u2)}
            strokeColor="#ffff8f"
          />
        </DisplayCard>

      </Box>
    </div>
  );
};

export default DisplaySensor;
