import React, { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'
import CountryDisplay from './components/CountryDisplay'
import axios from 'axios'

const Display = ({ countries, filterButton, weather }) => {
  if (countries.length === 1) {
    return <CountryDisplay country={countries[0]} weather={weather} />
  } else {
    return <ListCountries countries={countries} filterButton={filterButton} />
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [displayCountries, setDisplayCountries] = useState([])
  const [chosenCountry, setChosenCountry] = useState({})
  const [weather, setWeather] = useState([])

  const apiUrl = 'https://restcountries.eu/rest/v2/all?fields=name;capital;languages;flag;population'
  const weatherApi = 'http://api.weatherstack.com/current?'

  const handleFilterUpdate = (event) => {
    setFilter(event.target.value)
  }

  const setFilterTo = (value) => setFilter(value)

  // Fetch countries once
  useEffect(() => {
    axios
      .get(apiUrl)
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  // Filter countries when filter is updated
  useEffect(() => {
    const countriesToShow = countries.filter( country =>
      country.name.includes(filter))
    setDisplayCountries(countriesToShow)
    setChosenCountry(countriesToShow[0])
  }, [filter, countries])

  // Fetch weather for chosen country
  useEffect(() => {
    if (displayCountries.length === 1) {
      axios
        .get(weatherApi + 'access_key=' + process.env.REACT_APP_WEATHER_API_TOKEN
            + '&query=' + displayCountries[0].capital)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [chosenCountry, displayCountries])

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterUpdate} />
      <Display
        countries={displayCountries}
        filterButton={setFilterTo}
        weather={weather}
      />
    </div>
  )
}

export default App;