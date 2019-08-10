import React, { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import Display from './components/Display'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const apiUrl = 'https://restcountries.eu/rest/v2/all?fields=name;capital;languages;flag;population'

  const handleFilterUpdate = (event) => {
    setFilter(event.target.value)
  }

  const setFilterTo = (value) => setFilter(value)

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterUpdate} />
      <Display countries={countries} filter={filter} filterButton={setFilterTo} />
    </div>
  )
}

export default App;