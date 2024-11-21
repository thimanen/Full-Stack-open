import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

/* const getId = () => (100000 * Math.random()).toFixed(0) */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const votedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
    }
  },
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer