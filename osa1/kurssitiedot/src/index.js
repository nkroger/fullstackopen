import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {

    return (
        <h1>{props.course}</h1> 
    )
}

const Content = (props) => {
    return (
        <div>
            <p>{props.name} {props.ex}</p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.sum}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <>
            <Header course={course} />
            <Content name={part1} ex={exercises1} />
            <Content name={part2} ex={exercises2} />
            <Content name={part3} ex={exercises3} />
            <Total sum={exercises1 + exercises2 + exercises3} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
