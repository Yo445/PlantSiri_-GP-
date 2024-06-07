import React, { useEffect, useState } from "react";
import DisplayCard from "../../../components/DisplayCard";
import "./Dashboard.css";
import { Box } from "@mui/material";
import { MdSpaceDashboard } from "react-icons/md";
import { RiWaterPercentLine } from "react-icons/ri";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Loader from '../../../components/Loader';
import Gauage from "../../../components/Gauage";
import { MdSunny } from "react-icons/md";
import Sun from "../../../components/Sun";
import Water from "../../../components/Water";
import { MdWaterDrop } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdLandslide } from "react-icons/md";
import { IoIosSnow } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { WiStrongWind } from "react-icons/wi";

import { MdTimer, MdAccessTime } from "react-icons/md";
import ShowerIcon from '@mui/icons-material/Shower';
import { FaTemperatureHigh } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { RiSensorFill, RiWaterPercentFill } from "react-icons/ri";
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import NotFound from "../../../components/NotFound";
import axios from "axios";
import Col from "react-bootstrap/Col";
import { BiScatterChart } from "react-icons/bi";
import BarChartComponent from "../../../components/charts/bar-chart";
import ScatterChartComponent from "../../../components/charts/scatter-chart";
import LineChartComponent from "../../../components/charts/line-chart";
import { GiGrass } from "react-icons/gi";
import { MdOutlineLandslide } from "react-icons/md";
import { TiChartArea } from "react-icons/ti";


export default function DisplayDashboard({ sensorData }) {
    const { t } = useTranslation();


    const formatValue = (value) => {
        return parseFloat(value).toFixed(2);
    };

    const getTemperatureSettings = (temperature) => {
        if (temperature < 15) {
            return {
                strokeColor: "#b9e8ea",
                unitIcon: <IoIosSnow style={{ fontSize: "13px" }} />,
                cardIcon: <IoIosSnow style={{ fontSize: "17px" }} />
            };
        } else if (temperature >= 15 && temperature <= 25) {
            return {
                strokeColor: "rgb(175 74 41)",
                unitIcon: <FaTemperatureHalf style={{ fontSize: "13px" }} />,
                cardIcon: <FaTemperatureHalf style={{ fontSize: "17px" }} />
            };
        } else {
            return {
                strokeColor: "#892323",
                unitIcon: <FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "13px" }} />,
                cardIcon: <FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "17px" }} />
            };
        }
    };

    const temperatureSettings = getTemperatureSettings(sensorData.Tmax);

    return (
        <div style={{textAlign:"center"}}>
            <Container>
                <Row>
                    <div style={{ textAlign: "center" }}>
                        {/* Header */}
                        <Container>
                            <Row>
                                <h1><MdSpaceDashboard style={{ fontSize: "45px", marginBottom: "7px" }} /> {t('analytics_dashboard')}</h1>
                            </Row>
                        </Container>
                        {/* Cards */}
                        <Box display="flex" justifyContent="center" flexWrap="wrap">
                            {/* Temperature */}
                            <DisplayCard
                                title={t('avg_temperature')}
                                icon={temperatureSettings.cardIcon}
                            >
                                <Gauage
                                    units={'°C'}
                                    value={formatValue(sensorData.AVG_Tmax)}
                                    strokeColor={temperatureSettings.strokeColor}
                                    unitIcon={temperatureSettings.unitIcon}
                                />
                            </DisplayCard>

                            {/* Humidity */}
                            <DisplayCard
                                title={t('avg_humidity')}
                                icon={<RiWaterPercentLine style={{ fontSize: "20px", fontWeight: "500" }} />}
                            >
                                <Gauage
                                    units={'%'}
                                    value={formatValue(sensorData.AVG_RH_max)}
                                    unitIcon={<RiWaterPercentLine style={{ fontSize: "16px" }} />}
                                    strokeColor="#7c268d"
                                />
                            </DisplayCard>

                            {/* Solar Radiation */}
                            <DisplayCard
                                title={t('solar_radiation')}
                                icon={<MdSunny fontSize="21.5px" />}
                            >
                                <Sun initialValue={sensorData.AVG_Rs} />
                            </DisplayCard>

                            {/* Water Requirement */}
                            <DisplayCard
                                title={t('water_requirement')}
                                icon={<MdWaterDrop />}
                            >
                                <Water value={sensorData.total_water_requirement} />
                            </DisplayCard>

                            {/* Soil Moisture */}
                            <DisplayCard
                                title={t('AVG_soil_moisture')}
                                icon={<MdLandslide fontSize="17px" />}
                            >
                                <Gauage
                                    units={'%'}
                                    value={formatValue(sensorData.AVG_soil_moisture)}
                                    unitIcon={<MdLandslide style={{ fontSize: "14px" }} />}
                                    strokeColor="#2f6422"
                                />
                            </DisplayCard>

                            {/* Wind Speed */}
                            <DisplayCard
                                title={t('wind_speed')}
                                icon={<WiStrongWind fontSize="25px" />}
                            >
                                <Gauage
                                    units={'m/s'}
                                    value={formatValue(sensorData.AVG_u2)}
                                    unitIcon={<WiStrongWind style={{ color: "#c3c3b0", fontSize: "25px" }} />}
                                    strokeColor="#c3c3b0"
                                />
                            </DisplayCard>
                        </Box>
                    </div>
                </Row>
            </Container>
        </div>

    )
}
