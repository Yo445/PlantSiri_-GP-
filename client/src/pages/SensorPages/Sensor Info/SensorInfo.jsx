import React, { useState, useEffect } from 'react';
import DisplaySensor from '../Display/DisplaySensor';
import './SensorInfo.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AnalysisDisplay from '../Analytics/AnalysisDisplay';
import Loader from '../../../components/Loader';

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
          {/* <AnalysisDisplay sensorData={sensorData} /> */}
        </>
      ) : (
      <Loader/>
      )}
    </div>
  );
}



















































// /* sensor info */
// import React from 'react';
// import DisplaySensor from '../Display/DisplaySensor';
// import './SensorInfo.css';
// import sensorsData from "../../../Core/SensorsData"; // Importing sensor data
// import { useParams } from "react-router-dom";
// import AnalysisDisplay from '../Analytics/AnalysisDisplay';

// export default function SensorInfo() {
//   const { id } = useParams();
//   const sensorData = sensorsData.find((s) => s.sensor_id.toString() === id);

//   return (
//     <div className='Sensor-info'>
//       <DisplaySensor sensorData={sensorData} />
//       <AnalysisDisplay sensorData={sensorData}/>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import DisplaySensor from '../Display/DisplaySensor';
// import './SensorInfo.css';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import AnalysisDisplay from '../Analytics/AnalysisDisplay';
// import { useQuery } from 'react-query';
// import WaterStack from '../../../components/WaterStack';
// export default function SensorInfo() {
// const { id } = useParams();
//   const [sensorData, setSensorData] = useState(null);












    // ده الشغال 
 //   useEffect(() => {
  
//     const fetchData = async () => {
//       try {
//         console.log(id)
//         const response = await axios.get(`http://localhost:5000/data/${id}`);
//         setSensorData(response.data[0]); // Assuming you only expect one result
       
//       } catch (error) {
//         console.error('Error fetching sensor data:', error);
//       }
//     };
//       let final = fetchData()
//    console.log( final);
//   }, [id]);


//   return (
//     <div className='Sensor-info'>
//        {sensorData ? (
//         <>
//       <DisplaySensor sensorData={sensorData} />
//       <AnalysisDisplay sensorData={sensorData}/>
//       </>
//       ) : (
//          <WaterStack/>
//          )}
//         </div>
//   );
// }













































  // useEffect(() => {
  //     try {
  //       function fetchData(id) {
  //         return  axios.get(
  //           `http://localhost:5000/data/${id}`,
  //         )
  //               fetchData()
  //       }
       
  //     } catch (error) {
  //       console.error('Error fetching sensor data:', error);
  //     }

  //     fetchData()
  // }, []);


//      fetchData()

//     let {data , isLoading} = useQuery("fetchData" ,()=>fetchData(id))
//  console.log(data?.data)
 
//   return (
//     <div className='Sensor-info'>
//       {isLoading ? (
//         <>
//           <DisplaySensor sensorData={data} />
//           <AnalysisDisplay sensorData={data} />
//         </>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
// //   );
// // }

