import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhonebookService from './services/phonebook'
import Notifications from './components/Notification'

// TODO: Refaktoroi Person omaan komponenttiin, klikinkäsittelijä propsina?

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ successMessage, setSuccessMessage ] = useState(null)

    useEffect(() => {
        PhonebookService
            .getAll()
            .then(initialPeople => {
                setPersons(initialPeople)
            })
    },[])

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }

        const person = persons.find(p => p.name === newName)

        if (person) {
            // Person already exists
            if (window.confirm(
                `${newName} is already added to the phonebook, replace the old number with a new one?`
                )) {
                PhonebookService
                    .updateNumber(person.id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                        setSuccessMessage(
                            `Updated the number for '${newPerson.name}'`
                        )
                        setTimeout( () => {
                            setSuccessMessage(null)
                        }, 2000)
                    })
                    .catch(error => {
                        setErrorMessage(
                            `'${person.name}' was not found on the server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPersons(persons.filter(p => p.id !== person.id))
                    })
            }
        } else {
            PhonebookService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setSuccessMessage(
                        `Added '${newPerson.name}'`
                    )
                    setTimeout( () => {
                        setSuccessMessage(null)
                    }, 2000)
                })
                .catch(error => {
                    setErrorMessage(error.message)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
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

    const peopleToShow = persons.filter(p => p.name.includes(filter))

    const deletePerson = person => {
        const name = person.name
        const id = person.id
        if (window.confirm('Delete ' + name + '?')) {
            PhonebookService
                .delPerson(id)
                .catch(error => {
                    setErrorMessage(
                        `${name} was already deleted from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
                .then(res => {
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
    }
        

    const Footer = () => {
        const footerStyle = {
            color: 'green',
            fontStyle: 'italic',
            position: 'absolute',
            bottom: 0,
            fontSize: 16
        }

        return (
            <div style={footerStyle}>
                <br />
                <em>a simple little phonebook</em>
            </div>
        )
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notifications.ErrorNotification message={errorMessage} />
            <Notifications.SuccessNotification message={successMessage} />
            <Filter filter={filter} handleChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                submit={addPerson}
                />
            <h3>Numbers</h3>
            <div>
                {peopleToShow.map( p => 
                <Person
                    key={p.id}
                    number={p.number}
                    name={p.name}
                    delHandler={() => deletePerson(p)} />
                )}
            </div>
            <Footer />
        </div>
    )
}

export default App