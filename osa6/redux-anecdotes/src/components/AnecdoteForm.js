import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    displayNotification(dispatch, `You added anecdote "${content}"`)
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
