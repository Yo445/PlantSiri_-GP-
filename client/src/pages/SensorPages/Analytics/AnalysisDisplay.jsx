import React from "react";
import Grid from "@material-ui/core/Grid";
import './Analysis.css'
import ChartRight from "./Chart Right/ChartRight";
import LeftButton from "./Left Button/LeftButton";
import LeftTop from "./Left Top/LeftTop";

const AnalysisDisplay = ({ sensorData }) => {
  if (!sensorData) {
    return <div>Sensor not found</div>;
  }

  return (
    <div className="analysis-content">
      <div className="container">
        <div class="row">
          <div class="col-md-5">
            <div class="pb-3">
              <LeftTop sensorData={sensorData} />
            </div>
            <div class="row">
            <div class="pb-3">
              <LeftButton sensorData={sensorData}/>
            </div>
            </div>
          </div>
          <div class="col-md-7">
            <ChartRight sensorData={sensorData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDisplay;

