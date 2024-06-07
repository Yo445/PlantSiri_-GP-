import React from 'react';
import './components.css';

export default function Sun1({ initialValue }) {

  const formatValue = (value) => {
    return value !== undefined ? parseFloat(value).toFixed(2) : 'N/A';
  };

  return (
    <div className="sun-content">
      <div className="sun">
        <div className="center"></div>
        <div className="ray r-1"></div>
        <div className="ray r-2"></div>
        <div className="ray r-3"></div>
        <div className="ray r-4"></div>
        <div className="ray r-5"></div>
        <div className="ray r-6"></div>
        <div className="ray r-7"></div>
        <div className="ray r-8"></div>
      </div>
      <span className="temp">{formatValue(initialValue)} <span style={{color:"#707062", fontSize:"12px"}}>MJ/m²/day</span></span>
    </div>
  );
}