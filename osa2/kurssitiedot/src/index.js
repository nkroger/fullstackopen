import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

/*
const Total = (props) => {
    const exs = props.course.parts.map( part => part.exercises )
    const total = exs.reduce((a,b) => a+b, 0)

    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}*/

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
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
