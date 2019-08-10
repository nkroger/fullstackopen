import React from 'react'

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

const Weather = ({ report }) => {
    if (report.location !== undefined) {
        return <WeatherReport report={report} />
    } else return <div></div>
}

const WeatherReport = ({ report }) =>
    <div>
        <h2>Weather in {report.location.name}</h2>
        <p>
            <b>temperature</b> {report.current.temp_c} celsius.
            <br />
            <img src={report.current.condition.icon} alt={report.current.condition.text} />
            <br />
            <b>wind:</b> {report.current.wind_kph} {report.current.wind_dir}
        </p>
    </div>

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