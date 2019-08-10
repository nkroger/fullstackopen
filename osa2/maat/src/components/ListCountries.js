import React from 'react'

const Country = ({ name, setFilterTo }) =>
    <>{name}
        <button onClick={() => setFilterTo(name)}>show</button>
        <br />
    </>


const ListCountries = ({ countries, filterButton }) => {

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length > 1) {
        return countries.map( country =>
            <Country
                key={country.name}
                name={country.name}
                setFilterTo={filterButton}
            />)
    } else return <div></div>
}

export default ListCountries
