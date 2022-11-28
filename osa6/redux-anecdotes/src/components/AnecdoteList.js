import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

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
  const handleUpvote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote))
    displayNotification(dispatch, `You upvoted "${anecdote.content}"`)
  }
  const filter = useSelector( state => state.filter )
  const anecdotes = useSelector( state => {
    return [...state.anecdotes].sort( (a, b) => b.votes - a.votes ).filter( a => a.content.includes(filter) )
  })

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleUpvote(anecdote)}
        />
      )}
    </ul>
  )
}

export default AnecdoteList
