import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Offcanvas, Dropdown } from "react-bootstrap";
import { BiSolidLeaf } from "react-icons/bi";
import OpacityIcon from "@mui/icons-material/Opacity";
import { MdOutlineSensors } from "react-icons/md";
import axios from 'axios';
import { BsPieChartFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import './components.css';

function Header() {
    const { t, i18n } = useTranslation();
    const [sensorIds, setSensorIds] = useState([]);

    const fetchSensorData = () => {
        axios.get("http://localhost:5000/sensors")
            .then(response => {
                setSensorIds(response.data);
            })
            .catch(error => {
                console.error('Error fetching sensor IDs:', error);
            });
    };

    useEffect(() => {
        // Fetch sensor data initially
        fetchSensorData();

        // Set up interval to fetch sensor data every 60 seconds
        const interval = setInterval(fetchSensorData, 60000);

        // Clear interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const expand = false; // Set expand to false for the first navbar

    return (
        <Navbar key={expand} expand={expand} className="mb-3 p-4" id="header">
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
                        <span style={{ color: "black" }}>Plant</span>
                        <span style={{ color: "rgb(187 219 135)" }}>SIrI</span>
                    </Link>
                </Navbar.Brand>
                <div>
                    <Dropdown style={{ position: "absolute", right: "100px", top: "50%", transform: "translateY(-50%)" }}>
                        <Dropdown.Toggle
                            variant="outline-primary"
                            id="dropdown-basic"
                            style={{
                                color: "rgb(67, 79, 77)",
                                borderColor: "rgb(67, 79, 77)",
                                backgroundColor: "transparent",
                                transition: "all 0.3s"
                            }}
                        >
                            {i18n.language === 'en' ? 'English' : 'العربية'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ backgroundColor: "white" }}>
                            <Dropdown.Item onClick={() => changeLanguage('en')} className="dropdown-item">English</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeLanguage('ar')} className="dropdown-item">العربية</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        boxShadow: "0 8px 32px 0 rgba(31,38,135,.37)",
                        backdropFilter: "blur(20px)",
                        borderRadius: "10px"
                    }}
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            {t('sensors')} <MdOutlineSensors className="sen-icon" />
                        </Offcanvas.Title>
                        <Link to={"/analysis"} className="nav-link" id="analysis-btn">
                            <BsPieChartFill />
                        </Link>
                    </Offcanvas.Header>
                    <hr />
                    <Offcanvas.Body>
                        {/* Display sensor IDs */}
                        {sensorIds.map((sensorId, index) => (
                            <React.Fragment key={index}>
                                <Link
                                    to={`/sensor-info/${sensorId.sensor_id}`}
                                    className="nav-link"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <h5 style={{ color: "#718c6e", marginRight: "5px" }}>S#{index + 1}</h5> {/* Add 1 to index to start from 1 */}
                                        <span className="sens-title">{sensorId.sensor_id}</span>
                                        {sensorId.Status === "not irrigated" && <OpacityIcon style={{ color: "aqua" }} />} {/* Render OpacityIcon when Status is "not irrigated" */}
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