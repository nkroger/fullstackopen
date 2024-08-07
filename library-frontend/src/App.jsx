import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login"
import { ALL_AUTHORS, ALL_BOOKS } from './queries';
import { useApolloClient, useQuery } from '@apollo/client';
import Notify from './components/Notify';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const authorResult = useQuery(ALL_AUTHORS, {
    // 
  })
  const booksResult = useQuery(ALL_BOOKS, {

  })
  const client = useApolloClient()

  if (authorResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const userFav = "crime"


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
        { !token && <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      <Notify errorMessage={errorMessage} />
      <Login show={token === null} setError={notify} setToken={setToken} />

      <Authors show={page === "authors"} authors={authorResult.data.allAuthors} />

      <Books show={page === "books"} books={booksResult.data.allBooks} />

      <Books show={page === "recommended"} books={booksResult.data.allBooks} favouriteGenre={userFav} />

      <NewBook show={page === "add"} setError={notify} />

    </div>
  );
};

export default App;
