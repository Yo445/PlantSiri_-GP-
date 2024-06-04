import React from 'react';
import './components.css';

export default function Sun1({ initialValue }) {


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
      <span className="temp">{initialValue.toFixed(2)} <span style={{color:"#707062",fontSize:"12px"}}>MJ/m²/day</span></span>
    </div>
  );
}




{/* <div className='sun-content'>
<div class="sun"></div>
</div> */}