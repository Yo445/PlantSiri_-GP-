import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import './home.css';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Container className="home">
      <Row>
        {/* Left side with title */}
        <Col sm={5}>
          <div className="content">
            <h6 className='well'>{t('welcome_to')}</h6>
            <div className="name">
              <h1 style={{ fontWeight: "500", fontSize: "51.5px", color: "rgb(30 33 33)" }}
                  dangerouslySetInnerHTML={{ __html: t('integrated_agriculture_water_resource_management_system', { interpolation: { escapeValue: false } }) }}
              ></h1>
            </div>
            <div className="des">
              {/* System Description */}
              {t('system_description')}
            </div>
          </div>
        </Col>
        {/* Right side with background image */}
        <Col className="bg-img" sm={7}>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
