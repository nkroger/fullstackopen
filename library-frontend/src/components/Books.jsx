import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { BOOKS_GENRE } from '../queries'

const Books = ({ show, genreFilter = null, children = null }) => {
  const [genre, setGenreFilter] = useState(genreFilter ?? "")
 
  const { loading, data, refetch } = useQuery(BOOKS_GENRE, {
    variables: {
      genreFilter: genre
    }
  })
  
  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (!data) {
    return <div>no data :(</div>
  }

  const books = data.allBooks
  const genres = [...new Set(books.flatMap( book => book.genres ))]

  const filteredBooks = genre ? books.filter( b => b.genres.includes(genre) ) : books

  const setGenre = (newGenre) => {
    refetch({ genreFilter: newGenre })
    setGenreFilter(newGenre)
  }


  return (
    <div>
      <h2>books</h2>

      {
        children
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!genreFilter && genres.map( (g) => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      {
        !genreFilter && <button onClick={() => setGenre("")}>all genres</button>
      }
    </div>
  )
}

Books.propTypes = {
  genreFilter: PropTypes.string,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node
}


export default Books
