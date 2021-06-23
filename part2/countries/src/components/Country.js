import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const Country = ({ data: { name, capital, population, flag, languages }}) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}&units=m`) // m for metric
      .then(response => {setWeather(response.data.current)})
  }, [capital])

  return <>
    <h2>{name}</h2>
    <p><b>Capital:</b> {capital}</p>
    <p><b>Population:</b> {population}</p>
    <p><b>Spoken languages:</b> {languages.map((language) => (`${language.name}`)).join(', ')}</p>  

    <img src={flag} alt={name} width="100px" />
    {Object.keys(weather).length > 0 && <>
      <h2>Weather in {capital}</h2>
      <p><b>Temperature:</b> {weather.temperature} Celcius</p>
      <p><b>Wind:</b> {weather.wind_speed} km/h, {weather.wind_dir}</p>
      <img src={weather.weather_icons[0]} alt={weather.weather_descriptions}/>
    </>}
  </>

}

export default Country
