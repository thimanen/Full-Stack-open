import { useSelector, useDispatch } from 'react-redux'
import { addVoteToAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteToAnecdote(id))
  }

  /* Sorting function */
  const byVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      <h3>create new</h3>
      <AnecdoteForm />
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      
      
    </div>
  )
}

export default App