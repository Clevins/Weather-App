import React from 'react';

import AuxHoc from '../../hoc/AuxHoc';
import WeatherCard from './WeatherCard/WeatherCard';
import classes from './Weather.module.css';

const Weather = ( props ) => {
    return (
      <AuxHoc>
        <h2 className={classes.WeatherTitle}>{props.weather.name}</h2>
        <WeatherCard onclick={(location) => props.onclick(location)} weather={props.weather}/>
      </AuxHoc>
    )
}

export default Weather;
