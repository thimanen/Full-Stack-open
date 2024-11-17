import { useSelector, useDispatch } from 'react-redux'
import { addVoteToAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const anecdoteFilter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteToAnecdote(id))
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