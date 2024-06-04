import React from 'react';
import './components.css';
import { MdWaterDrop } from "react-icons/md";

function Water({ value,area }) {
  const roundedValue = value.toFixed(2);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="water-content">
        <span className="liquid-water"></span>
        <span className="water-value">{roundedValue}<span style={{color:"darkseagreen",fontSize:"20px"}}>L<MdWaterDrop style={{fontSize:"15px"}} /></span></span>
      <p style={{fontSize:"15px",color:"grey"}}>{area}m²</p>
      </div>
    </div>
  );
}

export default Water;
