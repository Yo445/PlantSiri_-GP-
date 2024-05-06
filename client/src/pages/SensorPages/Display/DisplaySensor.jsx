/* display sensor */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DisplayCard from "../../../components/DisplayCard";
import { Box } from "@mui/material";
import "./Display.css";
import { FaHistory } from "react-icons/fa";


const DisplaySensor = ({ sensorData }) => {
  if (!sensorData) {
    return <div>Sensor not found</div>;
  }

  return (
    <div className="card-container">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}><h1>{sensorData.name}<span>{sensorData.CropType}</span></h1></Col>
          <Col><button className="custom-button"><FaHistory /></button></Col>
        </Row>
      </Container>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        <DisplayCard
          className="card"
          title="Temperature"
        >
          Max: {sensorData.Tmax}<br /> Min: {sensorData.Tmin}
        </DisplayCard>

        <DisplayCard
          title="Humidity"
        >
          Max: ${sensorData.RH_max}, Min: ${sensorData.RH_min}
        </DisplayCard>

        <DisplayCard
          title="Wind Speed"
          content={`Wind Speed: ${sensorData.u2}`}
        >

        </DisplayCard>

        <DisplayCard
          title="Wind Speed"
          content={`Wind Speed: ${sensorData.u2}`}
        >

        </DisplayCard>

        <DisplayCard
          title="Wind Speed"
          content={`Wind Speed: ${sensorData.u2}`}
        >

        </DisplayCard>
        <DisplayCard
          title="Wind Speed"
          content={`Wind Speed: ${sensorData.u2}`}
        >

        </DisplayCard>
        <DisplayCard
          title="Wind Speed"
          content={`Wind Speed: ${sensorData.u2}`}
        >

        </DisplayCard>
        <DisplayCard
          title="Wind Speed"
          content={`Wind Speed: ${sensorData.u2}`}
        >

        </DisplayCard>
      </Box>
    </div>
  );
};

export default DisplaySensor;

