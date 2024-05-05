import React from "react";
import Grid from "@material-ui/core/Grid";
import './Analysis.css'
import ChartRight from "./Chart Right/ChartRight";
import LeftButton from "./Left Button/LeftButton";
import LeftTop from "./Left Top/LeftTop";

const AnalysisDisplay = () => {
  return (
    <div className="analysis-content">
      <Grid spacing={4} container>
        <Grid xs={4} item>
          <Grid spacing={4} direction="column" container>
            <Grid item>
              <LeftTop />
            </Grid>
            <Grid item>
              <LeftButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={8} item id="right-card">
          <ChartRight />
        </Grid>
      </Grid>
    </div>
  );
}

export default AnalysisDisplay;