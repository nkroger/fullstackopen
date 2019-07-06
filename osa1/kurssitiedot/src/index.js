import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {

    return (
        <h1>{props.course}</h1> 
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.ex}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.p1} ex={props.ex1} />
            <Part name={props.p2} ex={props.ex2} />
            <Part name={props.p3} ex={props.ex3} />
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
            <Content p1={part1} ex1={exercises1} p2={part2} ex2={exercises2} p3={part3} ex3={exercises3} />
            <Total sum={exercises1 + exercises2 + exercises3} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
