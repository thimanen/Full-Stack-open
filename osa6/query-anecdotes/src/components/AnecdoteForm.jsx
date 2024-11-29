import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from 'react'
import NotifContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      notifDispatch({type: "show", notification: `too short anecdote, must have length 5 or more`})
    setTimeout(() => {
      notifDispatch({type: "hide"})
    }, 2000)
    },
  })

  const [notif, notifDispatch] = useContext(NotifContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    
    notifDispatch({type: "show", notification: `anecdote "${content}" added`})
    setTimeout(() => {
      notifDispatch({type: "hide"})
    }, 2000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
