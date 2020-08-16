import React from 'react';
import { Card, Container, Row, Col }  from 'react-bootstrap';

import { ButtonRemove } from '../../Button/Button';
import classes from './WeatherCard.module.css';


const WeatherCard = ( props ) => {

    const IconSorce = `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`;

    return (
        <Card className={`mx-auto ${classes.Card}`}>
          <Card.Body className={classes.CardBody} >
            <Container>
              <Row>
                <Col xs={{ span: 12, order: 2 }}  md={{ span: 4, order: 1 }}>
                  <div className={classes.ImgDiv} >
                    <img
                      src={IconSorce}
                      alt="Weather Icon"/>
                    <h3>
                      {props.weather.main.temp} °C
                    </h3>
                  </div>
                </Col>
                <Col xs={{ span: 12, order: 3 }}  md={{ span: 4, order: 2 }}>
                  <div>
                    <h4>
                      {props.weather.weather[0].main}
                    </h4>
                    <p>
                      {props.weather.weather[0].description}
                    </p>
                    <h5 style={{marginTop:'25px'}}>
                      Pressure: {props.weather.main.pressure} hPa
                    </h5>
                    <h5 style={{marginTop:'25px'}}>
                      Humidity: {props.weather.main.humidity} %
                    </h5>
                  </div>
                </Col>
                <Col xs={{ span: 12, order: 1 }}  md={{ span: 4, order: 3 }}>
                  <div style={{width:'100%'}}>
                    <ButtonRemove
                      buttonHandler={() => props.onclick(props.weather.name)}/>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
    )
}

export default WeatherCard;
