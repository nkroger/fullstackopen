import React, { useState } from 'react'
// import Person from './components/Person'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const addName = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const people = () => persons.map(person =>
        <>{person.name}<br /></>)

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input 
                    value={newName}
                    onChange={handleNameChange}
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