import React from 'react'

const Person = ({ name, number, id, delHandler }) =>
    <>{name} {number}
        <button onClick={delHandler}>delete</button>
        <br />
    </>

export default Person