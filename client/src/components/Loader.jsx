// Loader.jsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import './components.css';


const Loader = () => {
  return (
    <div className='loading-content'>
  <div class="corners">
	<div class="corner corner--1"></div>
	<div class="corner corner--2"></div>
	<div class="corner corner--3"></div>
	<div class="corner corner--4"></div>
</div>
    </div>
  );
};

export default Loader;