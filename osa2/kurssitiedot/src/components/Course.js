import React from 'react'

const Header = ({ name }) => {
    return <h1>{name}</h1>
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ course }) => {
    const rows = () => course.parts.map( part =>
        <Part key={part.name} name={part.name} exercises={part.exercises} />
    )
    
    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({ parts }) => {
    const sum = parts.map( part => part.exercises).reduce( (a, b) => a+b)

    return <b>total of {sum} exercises</b>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course