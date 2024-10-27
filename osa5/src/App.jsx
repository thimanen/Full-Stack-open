import './index.css'
import { useState, useEffect, useRef } from 'react'
import BlogView from './components/BlogView'
import BlogForm from './components/BlogForm'
import LoginView from './components/LoginView'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ body: null, type: null })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs )
    )  
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('logged in as', user.username)
    }
  }, [])

  const sendNotification = (body, notifType) => {
    setNotification({body: body, type: notifType})

    setTimeout(() => {
      setNotification({body: null, type: null})
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const newUser = await loginService.login({username, password})
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(newUser))

      blogService.setToken(newUser.token)
      setUser(newUser)
      sendNotification(`${newUser.name} succesfully logged in`, 'info')
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      sendNotification('wrong username or password', 'error')
    }
  }
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService
      .create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    sendNotification(`a new blog: ${returnedBlog.title} by ${returnedBlog.author} added`, 'info')
  }
  
  return (
  <div>
    <Notification notification={notification} />

    { !user &&
      <LoginForm
        handlelogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword} />
    }

    { user &&
      <div>
        <h2>BLOGS</h2>
      
        <div>
          <LoginView
            user={user}
            setUser={setUser} />
        </div>

        <div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
        </div>

        <div>
          <h3>blogs added by user {user.name}</h3>
          <BlogView
            blogs={blogs}
            user={user} />
        </div>
      </div>
    }
  </div>
  )
}

export default App