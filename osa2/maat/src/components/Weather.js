import React from 'react'


const WeatherReport = ({ report }) =>
    <div>
        <h2>Weather in {report.location.name}</h2>
        <p>
            <b>temperature</b> {report.current.temperature} celsius.
            <br />
            <img src={report.current.weather_icons[0]} alt={report.current.weather_descriptions[0]} />
            <br />
            <b>wind:</b> {report.current.wind_speed} kph, direction {report.current.wind_dir}
        </p>
    </div>

const Weather = ({ report }) => {
    if (report.location !== undefined) {
        return <WeatherReport report={report} />
    } else return <div></div>
}

export default Weather