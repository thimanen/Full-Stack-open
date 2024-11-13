import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <h3>create new</h3>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App