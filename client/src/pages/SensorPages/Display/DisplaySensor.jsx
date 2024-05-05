import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DisplayCard from "../../../components/DisplayCard";
import { Box } from "@mui/material";
import LandslideIcon from "@mui/icons-material/Landslide";
import OpacityIcon from "@mui/icons-material/Opacity";
import TornadoIcon from "@mui/icons-material/Tornado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import './Display.css'
const DisplaySensor = () => {
  return (

    <Box
      className="card-container"
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
    >
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
      <DisplayCard
        title="Card 8"
        content="Content 8"
      // width="100%"
      // height="100%"
      />
    </Box>
  );
};

export default DisplaySensor;
