/* ChartRight.js */
import React from "react";
import DisplayCard from "../../../../components/DisplayCard";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";

const sample = [1, 10, 30, 50, 70, 90, 100];

export default function ChartRight({ sensorData }) {
    return (
        <DisplayCard title="Axis " width="100%" height="866px">
            <Box sx={{ width: "100%", maxWidth: 500 }}>
                <LineChart
                    xAxis={[{ data: sample }]}
                    yAxis={[
                        { id: "linearAxis", scaleType: "linear" },
                        { id: "logAxis", scaleType: "log" },
                    ]}
                    series={[
                        { yAxisKey: "linearAxis", data: sample, label: "linear" },
                        { yAxisKey: "logAxis", data: sample, label: "log" },
                    ]}
                    leftAxis="linearAxis"
                    rightAxis="logAxis"
                    height={400}
                />
            </Box>
        </DisplayCard>
    );
}
