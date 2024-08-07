import PropTypes from 'prop-types'
import { useState } from 'react'

const Books = ({ books, show, favouriteGenre = null }) => {
  const [genre, setGenre] = useState(favouriteGenre)
  if (!show) {
    return null
  }

  const genres = [...new Set(books.flatMap( book => book.genres ))]

  const filteredBooks = genre ? books.filter( b => b.genres.includes(genre) ) : books

  const description = () => {
    if (!genre) return null

    return (
      <p>
        in {favouriteGenre ? 'your favourite genre' : 'genre'} <b>{genre}</b>
      </p>
    )
  }

  return (
    <div>
      <h2>books</h2>

      {
        description()
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
      {!favouriteGenre && genres.map( (g) => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      {
        !favouriteGenre && <button onClick={() => setGenre(null)}>all genres</button>
      }
    </div>
  )
}

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.object.isRequired,
      published: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  show: PropTypes.bool.isRequired,
  favouriteGenre: PropTypes.string
}


export default Books
