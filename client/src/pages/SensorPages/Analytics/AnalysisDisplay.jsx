import React, { useState } from "react";
import "./Analysis.css";
import DisplayCard from "../../../components/DisplayCard";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import { FaChartLine } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { MdOutlineLineAxis } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md"; // Import MdOutlineFilterList icon
// import { BsFilterRight } from "react-icons/bs";
import NotFound from "../../../components/NotFound";
import sensorsData from "../../../Core/SensorsData"; // Importing sensor data

const sample = [1, 10, 30, 50, 70, 90, 100]; //note this for the right and left button charts

const AnalysisDisplay = () => {
  const YEARS = [2024, 2023, 2022, 2021, 2020];

  const [selectedYear, setSelectedYear] = useState(null);

  const filteredData = selectedYear
    ? sensorsData.filter((data) => +data.year === +selectedYear)
    : sensorsData;


  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  if (!sensorsData) {
    return <NotFound />;
  }
  // Filter data based on selected year

  return (
    <div className="analysis-content">
      <div className="container">
        <div className="row">
          <div className="col-md-1">
            {/* Year Filter */}
            <div className="filter pb-2">
              <select value={selectedYear} onChange={handleYearChange}>
                {YEARS.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="filter-icon">
                <MdOutlineFilterList />
              </div>
            </div>
          </div>
          <div className="col-md-5">
            {/* Left top chart */}
            <div>
              <DisplayCard
                title="Bar Chart"
                width="100%"
                height="100%"
                icon={<MdBarChart />}
              >
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: filteredData.map((sensor) => sensor.name),
                    },
                  ]}
                  series={filteredData.map((sensor) => {
                    return { data: [+sensor.Tmax] };
                  })}
                  width={500}
                  height={300}
                />
              </DisplayCard>
            </div>
            {/* Left button chart*/}
            <div className="row">
              <div className="pb-2">
                <DisplayCard
                  title="Axis"
                  width="100%"
                  height="100%"
                  icon={<FaChartLine />}
                >
                  <Box sx={{ width: "100%", maxWidth: 500 }}>
                    <LineChart
                      xAxis={[{ data: sample }]}
                      yAxis={[
                        { id: "linearAxis", scaleType: "linear" },
                        { id: "logAxis", scaleType: "log" },
                      ]}
                      series={[
                        {
                          yAxisKey: "linearAxis",
                          data: sample,
                          label: "linear",
                        },
                        { yAxisKey: "logAxis", data: sample, label: "log" },
                      ]}
                      leftAxis="linearAxis"
                      rightAxis="logAxis"
                      height={400}
                    />
                  </Box>
                </DisplayCard>
              </div>
            </div>
          </div>
          {/* Right Chart */}
          <div className="col-md-6 pb-2">
            <DisplayCard
              title="Axis "
              width="100%"
              height="882px"
              icon={<MdOutlineLineAxis />}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
