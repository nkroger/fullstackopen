import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { useSelector } from 'react-redux'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(anecdote =>
        anecdote.id !== updated.id ? anecdote : updated
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const upvoteAnecdote = anecdote => {
  return async dispatch => {
    const newVotes = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.updateVotes(newVotes)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
