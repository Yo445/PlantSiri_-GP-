import React, { useEffect, useState } from "react";
import "./Analysis.css";
import DisplayCard from "../../../components/DisplayCard";
import { Box, Select, MenuItem } from "@mui/material";
import { FaChartLine, FaTemperatureHigh, FaWind } from "react-icons/fa6";
import { MdBarChart, MdSpaceDashboard } from "react-icons/md";
import { RiWaterPercentLine } from "react-icons/ri";
import { BiScatterChart } from "react-icons/bi";
import NotFound from "../../../components/NotFound";
import BarChartComponent from "../../../components/charts/bar-chart";
import ScatterChartComponent from "../../../components/charts/scatter-chart";
import LineChartComponent from "../../../components/charts/line-chart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from '../../../components/Loader';
import Gauage from "../../../components/Gauage";
import axios from "axios";
import { MdSunny } from "react-icons/md";
import Sun from "../../../components/Sun";
import Water from "../../../components/Water";
import { TiChartArea } from "react-icons/ti";
import { MdWaterDrop } from "react-icons/md";
import { GiGrass } from "react-icons/gi";
import { WiCloudyWindy, WiStrongWind } from "react-icons/wi";
import { MdOutlineLandslide } from "react-icons/md";
import { RiWaterPercentFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdLandslide } from "react-icons/md";

/* Year  */
const getArrayFromDates = (start, end) => {
    let startDate = new Date(start).getFullYear();
    let endDate = new Date(end).getFullYear();
    const years = [];
    while (startDate <= endDate) {
        years.push(startDate);
        startDate++;
    }
    return years;
};

const getMinMaxDates = (data = []) => {
    const startDates = data.map((i) => new Date(i.start_date));
    const endDates = data.map((i) => new Date(i.end_date));
    const startDate = new Date(Math.min(...startDates));
    const endDate = new Date(Math.max(...endDates));
    return { startDate, endDate };
};

const AnalysisDashboard = () => {
    const { t, i18n } = useTranslation();
    const [chartData, setChartData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [yearsList, setYearsList] = useState([]);
    const [sensorData, setSensorData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const getChartsData = () => {
        setLoading(true);
        setError(false);
        axios
            .get(`http://localhost:5000/allDataSpecificYear/${selectedYear || ""}`)
            .then((response) => {
                setChartData(response.data);
                const maxMinDates = getMinMaxDates(response.data);

                if (selectedYear === "") {
                    setYearsList(getArrayFromDates(maxMinDates.startDate, maxMinDates.endDate));
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    };

    const getSensorData = () => {
        axios
            .get('http://localhost:5000/sensorss_data')
            .then((response) => {
                setSensorData(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching sensor data:', error);
            });
    };

    useEffect(() => {
        getChartsData();
        getSensorData();
    }, [selectedYear]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{t('error_loading_data')}</div>;
    }

    if (!chartData.length) {
        return <NotFound />;
    }

    const formatValue = (value) => (value !== undefined ? value.toFixed(2) : 'N/A');

    return (
        <Container>
            {/* cards content */}
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
                            icon={<FaTemperatureHigh style={{ fontSize: "18px", fontWeight: "100" }} />}
                        >
                            {/* <div>
                                <FaTemperatureHalf style={{ color: "#8e2525", fontSize: "80px" }} />
                                <h1 style={{ color: "rgb(102 55 23)", fontSize: "30px", marginTop: "7px" }}>{formatValue(sensorData.AVG_Tmax)} <span style={{ color: "rgb(102 55 23)", fontSize: "20px" }} >°C</span></h1>
                            </div> */}
                            <Gauage
                                units={'°C'}
                                value={formatValue(sensorData.AVG_Tmax)}
                                unitIcon={<FaTemperatureHalf style={{ color: "#8e2525", fontSize: "16px" }} />}
                                strokeColor="#892323"
                            />
                        </DisplayCard>

                        {/* Humidity */}
                        <DisplayCard
                            title={t('avg_humidity')}
                            icon={<RiWaterPercentLine style={{ fontSize: "20px", fontWeight: "500" }} />}
                        >
                            {/* <div>
                                <RiWaterPercentLine style={{ color: "#7c268d", fontSize: "80px" }} />
                                <h1 style={{ color: "#7c268d", fontSize: "30px", marginTop: "7px" }}>{formatValue(sensorData.AVG_RH_max)} <span style={{ color: "#7c268d", fontSize: "20px" }}>%</span></h1>
                            </div> */}
                            <Gauage
                                units={'%'}
                                value={formatValue(sensorData.AVG_RH_max)}
                                unitIcon={<RiWaterPercentLine style={{fontSize: "16px"}} />}
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
                            {/* <div>
                                <GiGrass style={{ color: "#2f6422", fontSize: "120px" }} />
                                <h1 style={{ color: "rgb(87 77 51)", fontSize: "30px" }}>{sensorData.AVG_Area.toFixed(2)} <span style={{ color: "#2f6422", fontSize: "20px" }} >m²</span></h1>
                            </div> */}
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
                            {/* <div>
                                <WiStrongWind style={{ color: "#c3c3b0", fontSize: "135px" }} />
                                <h1 style={{ color: "rgb(87 77 51)", fontSize: "30px" }}>{formatValue(sensorData.AVG_u2)} <span style={{ color: "rgb(120 120 113)", fontSize: "20px" }} >m/s</span></h1>
                            </div> */}
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
            {/* the Analytics Charts content */}
            <Row>
                <Container id="analysis-content">
                    <Row>
                        <Col sm={1}>
                            <div style={{ textAlign: "center" }}>
                                <Select
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                    displayEmpty
                                    style={{
                                        top: "0",
                                        right: "0",
                                        padding: "8px",
                                        backgroundColor: "rgba(255,255,255,0.5)",
                                        borderRadius: "9px",
                                        border: "none",
                                        height: "40px",
                                        fontSize: "15px",
                                        marginTop: "15px",
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 150,
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        {t('all_years')}
                                    </MenuItem>
                                    {yearsList.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </Col>
                        <Col sm={11}>
                            <DisplayCard
                                title={t('line_chart')}
                                width="100%"
                                height="100%"
                                icon={<FaChartLine />}
                            >
                                <LineChartComponent data={chartData} lineColor="#bbdb87" />
                            </DisplayCard>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <DisplayCard
                                title={t('scatter_chart')}
                                width="100%"
                                height="100%"
                                icon={<BiScatterChart />}
                            >
                                <Box sx={{ width: "100%", maxWidth: 500 }}>
                                    <ScatterChartComponent data={chartData} scatterColor={"aqua"} />
                                </Box>
                            </DisplayCard>
                        </Col>
                        <Col sm={6}>
                            <DisplayCard
                                title={t('bar_chart')}
                                width="100%"
                                height="100%"
                                icon={<MdBarChart />}
                            >
                                <BarChartComponent data={chartData} barColor={"indianred"} />
                            </DisplayCard>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
};

export default AnalysisDashboard;
