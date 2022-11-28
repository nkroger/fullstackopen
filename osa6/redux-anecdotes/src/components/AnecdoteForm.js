import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added anecdote "${content}"`))
  }

  const style = {
    marginBottom: 5
  }

  return (
    <form onSubmit={addAnecdote}>
      <div style={style}><input name="anecdote"/></div>
      <button style={style} type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
