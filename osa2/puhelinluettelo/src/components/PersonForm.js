import React from 'react'

const PersonForm = ({ submit, newName, newNumber, handleNameChange, handleNumberChange}) =>
    <form onSubmit={submit}>
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

export default PersonForm