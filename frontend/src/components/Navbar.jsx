import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { BiSolidLeaf } from "react-icons/bi";
import OpacityIcon from "@mui/icons-material/Opacity";
import { MdOutlineSensors } from "react-icons/md";
import axios from 'axios';
import { BsPieChartFill } from "react-icons/bs";
import './components.css';

function Header() {
    const [sensorIds, setSensorIds] = useState([]);

    useEffect(() => {
        // Fetch sensor data from the API
        axios.get("http://localhost:5000/sensors")
            .then(response => {
                setSensorIds(response.data);
            })
            .catch(error => {
                console.error('Error fetching sensor IDs:', error);
            });
    }, []);

    const expand = false; // set expand to false for the first navbar

    return (
        <Navbar key={expand} expand={expand} className="mb-3 p-4"  id="header">
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
                        <span style={{color:"rgb(31 54 54)"}}>Plant</span><span style={{color:"rgb(187 219 135)"}}>SIrI</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas style={{ background: "rgba(255,255,255,0.05)", boxShadow: "0 8px 32px 0 rgba(31,38,135,.37)", backdropFilter: "blur(20px)", borderRadius: "10px" }}
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Sensors <MdOutlineSensors className="sen-icon" />
                        </Offcanvas.Title>
                        <Link to={"/analysis"} className="nav-link" id="analysis-btn"><BsPieChartFill /></Link>
                    </Offcanvas.Header>
                    <hr />

                    <Offcanvas.Body>
                        {/* Display sensor IDs */}
                        {sensorIds.map((sensorId, index) => (
                            <React.Fragment key={index}>
                                <Link
                                    to={`/sensor-info/${sensorId.sensor_id}`}
                                    className="nav-link"
                                    style={{ justifyContent: "center", textAlign: "center" }}
                                >
                                    <div style={{ justifyContent: "center", textAlign: "center", display: "-webkit-inline-box" }}>
                                        <h5 style={{ color: "#718c6e" }}>S#{index}</h5>
                                        <span className="sens-title">{sensorId.sensor_id}</span>
                                        {sensorId.Status === "!Not Irrigated" && <OpacityIcon style={{ color: "aqua" }} />} {/* Render OpacityIcon when Status is "!Not Irrigated" */}
                                    </div>
                                </Link>
                                <hr />
                            </React.Fragment>
                        ))}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
