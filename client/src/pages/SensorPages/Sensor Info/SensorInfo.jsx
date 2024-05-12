/* sensor info */
import React from 'react';
import DisplaySensor from '../Display/DisplaySensor';
import './SensorInfo.css';
import sensorsData from "../../../Core/SensorsData"; // Importing sensor data
import { useParams } from "react-router-dom";
import AnalysisDisplay from '../Analytics/AnalysisDisplay';

export default function SensorInfo() {
  const { id } = useParams();
  const sensorData = sensorsData.find((s) => s.sensor_id.toString() === id);

  return (
    <div className='Sensor-info'>
      <DisplaySensor sensorData={sensorData} />
      {/* <AnalysisDisplay sensorData={sensorData}/> */}
    </div>
  );
}
