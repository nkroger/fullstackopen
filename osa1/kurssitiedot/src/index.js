import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {

    return (
        <h1>{props.course.name}</h1> 
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
    const [p1, p2, p3] = props.course.parts

    return (
        <div>
            <Part name={p1.name} ex={p1.exercises} />
            <Part name={p2.name} ex={p2.exercises} />
            <Part name={p3.name} ex={p3.exercises} />
        </div>
    )
}

const Total = (props) => {
    const exs = props.course.parts.map( part => part.exercises )
    const total = exs.reduce((a,b) => a+b, 0)

    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
            name: 'State of a component',
            exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
