import React from 'react'

const Person = ({ name, number }) =>
    <>{name} {number}<br /></>

const Persons = ({ persons, filter }) => persons.filter(person =>
    person.name.includes(filter)).map(person =>
    <Person
        key={person.name}
        name={person.name}
        number={person.number}
    />)

export default Persons