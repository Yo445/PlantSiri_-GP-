import React from 'react';
import styled, { keyframes } from 'styled-components';
import './components.css';

const Loader = () => {
  return (
    <div className='loading-content'>
      <div className="corners">
        <div className="corner corner--1"></div>
        <div className="corner corner--2"></div>
        <div className="corner corner--3"></div>
        <div className="corner corner--4"></div>
      </div>
    </div>
  );
};

export default Loader;