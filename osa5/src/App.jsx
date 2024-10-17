import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('logged in as', user.username)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    console.log('logging out user:', user.username)
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
  
  let blogsToShow = []
  if (blogs.length && user) {
    blogsToShow = blogs.filter(blog => blog.user.username === user.username)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username 
            <input
              type="text"
              value={username}
              name="username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password 
            <input
              type="password"
              value={password}
              name="password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } 

  /* blogs read and user logged in */
  if (blogsToShow != null) {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
        
          <button onClick={handleLogout}>
            logout
          </button>
        </p>
        
        {blogsToShow.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }
}

export default App