import React, { useState } from 'react'
// import Person from './components/Person'

const App = () => {
    const [ persons, setPersons ] = useState([
        {
            name: 'Arto Hellas',
            number: '040-1234567'
        }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

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

    const people = () => persons.map(person =>
        <>{person.name} {person.number}<br /></>)

    return (
        <div>
            <h2>Phonebook</h2>
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