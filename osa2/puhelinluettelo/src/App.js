import React, { useState } from 'react'
// import Person from './components/Person'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-1234567' },
        { name: 'Ada Lovelace', number: '39-44-5323523'},
        { name: 'Dan Abramov', number: '12-43-234345'},
        { name: 'Mary Poppendick', number: '39-23-6423122'}
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (persons.map(p => p.name).includes(newName)) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const people = () => persons.filter(person => person.name.includes(filter)).map(person =>
        <>{person.name} {person.number}<br /></>)

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with <input
                    value={filter}
                    onChange={handleFilterChange}
                    />
            </div>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input 
                    value={newName}
                    onChange={handleNameChange}
                    />
                </div>
                <div>
                    number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {people()}
            </div>
        </div>
    )
}

export default App