import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader";
import DisplayDashboard from "./DisplayDashboard";
import AnalysisDashboard from "./AnalysisDashboard";

export default function Dashboard() {
  const { id } = useParams();
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get('http://localhost:5000/sensorss_data');
        setSensorData(response.data[0]); // Assuming you only expect one result
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();

    // Refresh data every minute
    const interval = setInterval(fetchData, 6000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div >
      {sensorData ? (
        <>
          <DisplayDashboard sensorData={sensorData} />
          <AnalysisDashboard sensorData={sensorData} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
