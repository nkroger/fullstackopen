import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
    return <h1>{text}</h1>
}

const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Display = ({ text, counter }) => (
    <div>{text} {counter}</div>
)


const App = () => {
    // tallennetaan napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => {
        setGood(good +1)
    }

    const addNeutral = () => {
        setNeutral(neutral +1)
    }

    const addBad = () => {
        setBad(bad +1)
    }

    return (
        <div>
            <Header text='give feedback' />
            <Button text='good' handleClick={addGood} />
            <Button text='neutral' handleClick={addNeutral} />
            <Button text='bad' handleClick={addBad} />
            <Header text='statistics' />
            <Display text='good' counter={good} />
            <Display text='neutral' counter={neutral} />
            <Display text='bad' counter={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));