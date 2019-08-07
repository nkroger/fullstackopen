import React from 'react'

const Country = ({ name }) =>
    <>{name}<br /></>

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

const CountryDisplay = ({ country }) =>
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}<br />
        population {country.population}</p>

        <Languages languages={country.languages} />
        <img src={country.flag} alt={'flag of ' + country.name} width='128' />
    </div>

const Display = ({ countries, filter }) => {
    const shownCountries = countries.filter( country =>
        country.name.includes(filter))

    if (shownCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (shownCountries.length > 1) {
        return shownCountries.map( country =>
            <Country
                key={country.name}
                name={country.name}
            />)
    } else if (shownCountries.length === 1) {
        return <CountryDisplay country={shownCountries[0]} />
    } else return <div></div>
}

export default Display
