import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      <div>
      {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.sort( (a, b) => b.votes - a.votes ))

  return(
    <ul>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => dispatch(upvoteAnecdote(anecdote.id))}
      />
    )}
    </ul>
  )
}

export default AnecdoteList
