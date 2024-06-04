import React from 'react'
import './components.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function NotFound() {
  return (
<Container style={{margin:"auto"}}>
<Row className='notfound-content'>
  <Col sm={6} style={{textAlign:"center", justifyContent:"center", display:"contents"}}><h style={{fontSize:"65px",color:"rgb(38, 38, 38)",marginRight:"30px"}} >This Page Not Found</h></Col>
  <Col sm={6} style={{textAlign:"center", justifyContent:"center", display:"contents"}}><h1 className='num'>4</h1> <div class="liquid"></div><h1 className='num'>4</h1></Col>
</Row>
</Container>
  )
}
