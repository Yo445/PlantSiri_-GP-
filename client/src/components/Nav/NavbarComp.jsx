import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../icons/logo1.svg";
import WaterIcon from "../icons/drop.png"; //drop.png
import CalendarIcon from "../icons/calend.png"; //calend.png
import CameraIcon from "../icons/camera-lens.png"; //camera-lens.png

const NavbarComp = () => {
  return (
    <Navbar className="nav" expand="lg">
      <Navbar.Brand href="/watering" className="brand">
        <img src={Logo} alt="PlantSiri Logo" className="logo-img" />
        PlantSiri
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "200px" }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/watering" className="font">
            <img src={WaterIcon} alt="Watering Icon" className="icon" />
            <h7>Watering</h7>
          </Nav.Link>
          <Nav.Link as={Link} to="/calendar" className="font">
            <img src={CalendarIcon} alt="Calendar Icon" className="icon" />
            <h7>Calendar</h7>
          </Nav.Link>
          <Nav.Link as={Link} to="/camera" className="font">
            <img src={CameraIcon} alt="Camera Icon" className="icon" />
            <h7>Camera</h7>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
