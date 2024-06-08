import React, { useEffect, useState } from "react";
import DisplayCard from "../../../components/DisplayCard";
import "./Dashboard.css";
import { Box, Select, MenuItem } from "@mui/material";
import { FaChartLine } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { BiScatterChart } from "react-icons/bi";
import NotFound from "../../../components/NotFound";
import BarChartComponent from "../../../components/charts/bar-chart";
import ScatterChartComponent from "../../../components/charts/scatter-chart";
import LineChartComponent from "../../../components/charts/line-chart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from 'react-i18next';
import axios from "axios";

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

const AnalysisDashboard = ({ sensorData }) => {

    const { t } = useTranslation();
    const [chartData, setChartData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [yearsList, setYearsList] = useState([]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const getChartsData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/allDataSpecificYear/${selectedYear || ""}`);
            setChartData(response.data);
            const maxMinDates = getMinMaxDates(response.data);

            if (selectedYear === "") {
                setYearsList(getArrayFromDates(maxMinDates.startDate, maxMinDates.endDate));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Add error handling here, e.g., display an error message
        }
    };

    useEffect(() => {
        if (sensorData) {
            getChartsData();
        }
    }, [sensorData, selectedYear]);

    // Uncomment the below useEffect if you want to fetch new data every 60 seconds
    // useEffect(() => {
    //     const intervalId = setInterval(getChartsData, 60000); // Fetch new data every 60 seconds
    //     return () => clearInterval(intervalId); // Cleanup interval on unmount
    // }, [selectedYear]);

    if (!sensorData) {
        return <NotFound />;
    }

    return (
        <Container>
            <Row>
                <Container style={{ padding: '10px 30px 20px 20px' }}>
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
                        title={"Tmax Vs Tmin"}
                        width="100%"
                                height="100%"
                                icon={<FaChartLine />}
                            >
                        <LineChartComponent data={chartData} lineColor1="#892323"  lineColor2="#b9e8ea" />
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
                                title={'ET0_mm'}
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