import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const anecdoteFilter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.filter(entry => entry.id === id)[0]
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 5))
  }

  /* Sorting function */
  const byVotes = (a, b) => b.votes - a.votes
  
  return (
    <div>
      {anecdotes
        .filter((entry) => entry.content.toLowerCase().includes(anecdoteFilter))
        .sort(byVotes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div> has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList