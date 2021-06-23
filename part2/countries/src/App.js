import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])
  const [countryData, setCountryData] = useState({})

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {setCountries(response.data)})
  }, [])

  useEffect(() => {
    setCountryData(countriesFilter.length === 1 ? { ...countriesFilter[0] } : {})
  }, [countriesFilter])

  const searchCountries = (e) => {
    setCountry(e.target.value)
    setCountriesFilter(
      countries.filter(country => country.name.toUpperCase().search(e.target.value.toUpperCase()) !== -1)
    )
  }

  const showCountries = () => {
    return countriesFilter.map(country => 
      <p key={country.name}>{country.name} {' '} <button onClick={setCountryData(country)}>Show</button></p>
    )
  }

  return <>
    <p> Find countries {' '} <input value={country} onChange={searchCountries} /></p>
    {countriesFilter.length > 10 ? <p>Too many matches. Be more specific!</p> : showCountries}
    {countryData.name && <Country data={countryData} />}
  </>
}

export default App
