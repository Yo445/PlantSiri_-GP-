/* display sensor */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DisplayCard from "../../../components/DisplayCard";
import { Box } from "@mui/material";
import "./Display.css";
import { MdTimer } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import ShowerIcon from '@mui/icons-material/Shower';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import GaugeComponent from 'react-gauge-component'
import { LuWind } from "react-icons/lu";
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import Gauage from "../../../components/Gauage";
import { WiHumidity } from "react-icons/wi";

const DisplaySensor = ({ sensorData }) => {
  if (!sensorData) {
    return <div>Sensor not found</div>;
  }

  return (
    <div className="card-container">
      {/* Header */}
      <Container>
        <Row>
          <h1>{sensorData.name}<span>{sensorData.CropType}</span></h1>
          {/* <Col><button className="custom-button"><FaHistory /></button></Col>history button */}
        </Row>
      </Container>
      {/* Cards */}
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {/* Time */}
        <DisplayCard
          title="Time"
          icon={<MdAccessTime />}
        >
          <div>
            <h5>Start</h5>
            <h1>{sensorData.start_date}</h1>
            <hr />
            <h5>End</h5>
            <h1>{sensorData.end_date}</h1>
          </div>
        </DisplayCard>

        {/* Remaining Time */}
        <DisplayCard
          title="Remaining Time"
          icon={<MdTimer />}
        >
          <h1>{sensorData.remainingTime}</h1>
        </DisplayCard>

        {/* Irrigation Status */}
        <DisplayCard
          title="Irrigation_status"
          icon={<ShowerIcon fontSize="large" />}
        >
          <h1 style={{ color: sensorData.Status === "!Not Irrigated" ? "brown" : "#2682b5" }}>
            {sensorData.Status}
          </h1>
        </DisplayCard>

        {/* Duration */}
        <DisplayCard
          title="Duration"
          icon={<FontAwesomeIcon fontSize="small" icon={faHourglassHalf} />}
        >
          <div>
            <h5>Irrigation_Duration</h5>
            <h1>{sensorData.IrrigationDuration}</h1>
            <hr />
            <h5>Cycle</h5>
            <h1>{sensorData.Cycle}</h1>
          </div>
        </DisplayCard>
        {/* Cycle Status */}
        <DisplayCard
          title="cycle_status"
          icon={<RunningWithErrorsIcon />}
        >
          <h1 className="cycle_status">{sensorData.cycle_status}</h1>
        </DisplayCard>
        {/* Temperature */}
        <DisplayCard
          title="Temperature"
          icon={
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              style={{ fontSize: "17px" }}
            />
          }
        >
        <Gauage
        units={'°C'}
        value={sensorData.Tmax}
        strokeColor="#c42514"
        />
        </DisplayCard>

        {/* Humidity */}
        <DisplayCard
          title="Humidity"
          icon={<WiHumidity style={{ fontSize: "24px" }} />}
        >
        <Gauage
        units={'%'}
        value={sensorData.RH_max}
        strokeColor="#418c23"
        />
        </DisplayCard>

        {/* Wind Speed */}
        <DisplayCard
          title="Wind Speed"
          icon={<LuWind fontSize="19px" />}
        >
        <Gauage
        units={'m/s'}
        value={sensorData.u2}
        strokeColor="#3bedd8"
        />
        </DisplayCard>

      </Box>
    </div>
  );
};

export default DisplaySensor;

