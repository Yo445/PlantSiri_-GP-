import React, { useEffect, useState } from "react";
import "./Analysis.css";
import DisplayCard from "../../../components/DisplayCard";
import { Box, Select, MenuItem } from "@mui/material";
import { FaChartLine } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import NotFound from "../../../components/NotFound";
import BarChartComponent from "../../../components/charts/bar-chart";
import axios from "axios";
import ScatterChartComponent from "../../../components/charts/scatter-chart";
import { BiScatterChart } from "react-icons/bi";
import LineChartComponent from "../../../components/charts/line-chart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from '../../../components/Loader';

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

const AnalysisDisplay = () => {
    const [chartData, setChartData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearsList, setYearsList] = useState([]);
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

                if (selectedYear === null) {
                    setYearsList(getArrayFromDates(maxMinDates.startDate, maxMinDates.endDate));
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        getChartsData();
    }, [selectedYear]);

    if (loading) {
        return < Loader />;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    if (!chartData.length) {
        return <NotFound />;
    }

    return (
        <Container id="analysis-content">
            <Row>
                <Col sm={1}>
                    <div style={{ textAlign: "center" }}>
                        <Select
                            value={selectedYear}
                            onChange={handleYearChange}
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
                        title="Line Chart"
                        width="100%"
                        height="100%"
                        icon={<FaChartLine />}
                    >
                        <LineChartComponent data={chartData} lineColor="#bbdb87"/>
                    </DisplayCard>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <DisplayCard
                        title="Scatter Chart"
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
                        title="Bar Chart"
                        width="100%"
                        height="100%"
                        icon={<MdBarChart />}
                    >
                        <BarChartComponent data={chartData}  barColor={"indianred"}/>
                    </DisplayCard>
                </Col>
            </Row>
        </Container>
    );
};

export default AnalysisDisplay;
