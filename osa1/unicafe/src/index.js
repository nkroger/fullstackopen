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

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad, total }) => {
    if (total === 0) {
        return <div>No feedback given</div>
    }
    return (
        <table>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={total} />
            <Statistic text="average" value={(good-bad)/total} />
            <Statistic text="positive" value={(100*good/total)+" %"} />
        </table>
    )
}


const App = () => {
    // tallennetaan napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    const addGood = () => {
        setTotal(total +1)
        setGood(good +1)
    }

    const addNeutral = () => {
        setTotal(total +1)
        setNeutral(neutral +1)
    }

    const addBad = () => {
        setTotal(total +1)
        setBad(bad +1)
    }

    return (
        <div>
            <Header text='give feedback' />
            <Button text='good' handleClick={addGood} />
            <Button text='neutral' handleClick={addNeutral} />
            <Button text='bad' handleClick={addBad} />
            <Header text='statistics' />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
            />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));