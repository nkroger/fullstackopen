import React from 'react'
import Weather from './Weather'

const Languages = ({ languages }) => {
    return <div>
                <h2>Languages</h2>
                <ul>
                    {languages.map(lang =>
                        <li key={lang.name}>{lang.name}</li>        
                    )}
                </ul>
            </div>
}

const CountryDisplay = ({ country, weather }) =>
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}<br />
        population {country.population}</p>

        <Languages languages={country.languages} />
        <img src={country.flag} alt={'flag of ' + country.name} width='128' />
        <br />
        <Weather report={weather} />
    </div>

export default CountryDisplay