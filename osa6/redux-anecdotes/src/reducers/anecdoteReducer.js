import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    upvoteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, upvoteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
