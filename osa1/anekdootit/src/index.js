import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => (
    <h1>{text}</h1>
)

const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Display = ({ index, data }) => (
    <div>{data[index]}</div>
)

const DisplayBest = ({ data, points }) => {
    const maxIndex = points.reduce((currentMax, x, i, points) => x > points[currentMax] ? i : currentMax, 0)
    return <div>{data[maxIndex]}</div>
}

const ShowPoints = ({ points }) => (
    <div>has {points} votes</div>
)

const App = (props) => {
    const [selected, setSelected] = useState(Math.floor(Math.random()*props.anecdotes.length))
    const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))

    const randomIndex = () => {
        const index = Math.floor(Math.random()*(props.anecdotes.length))
        setSelected(index)
    }

    const addVote = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    return (
        <div>
            <Header text='Anecdote of the day' />
            <Display index={selected} data={props.anecdotes} />
            <ShowPoints points={points[selected]} />
            <Button text='vote' handleClick={addVote} />
            <Button text='next anecdote' handleClick={randomIndex} />
            <Header text='Anecdote with most votes' />
            <DisplayBest data={props.anecdotes} points={points} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
