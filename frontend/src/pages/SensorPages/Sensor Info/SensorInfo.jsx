import React, { useState, useEffect } from 'react';
import DisplaySensor from '../Display/DisplaySensor';
import './SensorInfo.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/Loader';
import AnalysisDisplay from '../Analytics/AnalysisDisplay'
export default function SensorInfo() {
  const { id } = useParams();
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id)
        const response = await axios.get(`http://localhost:5000/data/${id}`);
        setSensorData(response.data[0]); // Assuming you only expect one result
       
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();

    // Refresh data every minute
    const interval = setInterval(fetchData, 6000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className='Sensor-info'>
      {sensorData ? (
        <>
          <DisplaySensor sensorData={sensorData} />
          <AnalysisDisplay sensorData={sensorData} />
        </>
      ) : (
      <Loader/>
      )}
    </div>
  );
}
