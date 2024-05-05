import React from 'react'
import DisplaySensor from '../Display/DisplaySensor'
import AnaysisSensor from '../Analytics/AnalysisDisplay'
import './SensorInfo.css'
export default function SensorInfo() {
  return (
    <div className='Sensor-info'>
      <DisplaySensor />
      <hr />
      <AnaysisSensor />
    </div>
  )
}
