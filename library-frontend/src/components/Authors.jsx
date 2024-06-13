import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_BORN } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState(props.authors[0].name ?? '')
  const [born, setBorn] = useState('')

  const [ setBirthYear ] = useMutation(EDIT_BORN)

  if (!props.show) {
    return null
  }
  const authors = props.authors ?? []

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(`Setting birth year for ${author} to ${born}`)

    const year = parseInt(born)
    if (year) {
      setBirthYear({ variables: { name: author, born: year }})

      setBorn('')
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          author:
        </label>
        <select name="selectedAuthor" onChange={({ target }) => setAuthor(target.value)}>
          { authors.map( (a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            />
        </div>
        <button type='submit'>Set birth year</button>
      </form>
    </div>
  )
}

export default Authors
