import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import Dashboard from "../../pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Add your custom styles here

function Watering() {
  return (
    <div className="container">
      <Dashboard />
      <div className="small-cards d-flex flex-wrap justify-content-center">
        <CustomCard title="Humidity" percentage={50} />
        <CustomCard title="Water Ratio" percentage={70} />
        <CustomCard title="Temperature" percentage={80} />
        <CustomCard title="Soil Moisture" percentage={60} />
      </div>
    </div>
  );
}

function CustomCard({ title, percentage }) {
  return (
    <Card className="custom-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5>{title}</h5>
          <ProgressBar
            now={percentage}
            label={`${percentage}%`}
            variant="success"
            className="custom-progress-bar"
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Watering;
