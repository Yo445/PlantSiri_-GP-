import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './home.css';

const HomePage = () => {
  return (
    <Container className="home">
      <Row >
        {/* Left side with title */}
        <Col>
          <div className="content">
            <h6 className='well'>Welcome to</h6>
            <div className="name">
            <h1 style={{fontWeight:"600",fontSize:"60px"}}> Integrated Agriculture <span>Water</span> Resource Management System</h1>
            </div>
            <div className="des">
              {/* System Discription*/}
              An Integrated Agricultural Water Resources Management (IAWRM) system that improves water use, enhances agricultural productivity, conserves ecosystems, and ensures sustainable livelihoods for current and future generations.
            </div>
          </div>
        </Col>
        {/* Right side with background image */}
        <Col className="bg-img">
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;