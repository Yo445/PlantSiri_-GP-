import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { BiSolidLeaf } from "react-icons/bi";
import OpacityIcon from "@mui/icons-material/Opacity";
import sensorsData from "../Core/SensorsData";
import { MdOutlineSensors } from "react-icons/md";
import './components.css';

function Header() {
    const expand = false; // set expand to false for the first navbar

    return (
        <Navbar key={expand} expand={expand} className="mb-3 p-4" bg="transparent">
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/" className="nav-link">
                        <BiSolidLeaf
                            style={{
                                marginRight: "10px",
                                fontSize: "34px",
                                color: "rgb(187 219 135)",
                            }}
                        />
                        PlantSIrI
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas style={{ background:"rgba(255,255,255,0.05)",boxShadow:"0 8px 32px 0 rgba(31,38,135,.37)",backdropFilter:"blur(20px)",borderRadius:"10px"}}
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Sensors <MdOutlineSensors className="sen-icon" />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr />

                    <Offcanvas.Body>
                        {/* Content of the expand menue Sensors links*/}
                        {/* map function */}
                        {sensorsData.map((sensN, i) => {
                            let index = i + 1; // Start index from 1
                            return (
                                <React.Fragment key={sensN.id}>
                                    <Link
                                        to={`/sensor-info/${sensN.sensor_id}`}
                                        className="nav-link"
                                        style={{ justifyContent: "center", textAlign: "center" }}
                                    >
                                        <div style={{ justifyContent: "center", textAlign: "center", display: "-webkit-inline-box" }}>
                                            <h5 style={{color:"#718c6e"}}>Sensor: #{index}</h5> {/* Use index instead of i */}
                                            <span className="sens-title">{sensN.name}</span>
                                            {sensN.Status === "!Not Irrigated" && <OpacityIcon className="drop" />} {/* Render OpacityIcon when Status is "!Not Irrigated" */}
                                        </div>
                                    </Link>
                                    <hr />
                                </React.Fragment>
                            );
                        })}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
