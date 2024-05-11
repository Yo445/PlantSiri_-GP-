// WaterStack.jsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import './loading.css';


const Loading = () => {
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

export default Loading;
