import "./index.css"
import { useState, useEffect, useRef, useContext } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import BlogView from "./components/BlogView"
import BlogForm from "./components/BlogForm"
import LoginView from "./components/LoginView"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import NotificationContext from "./NotificationContext"

const App = () => {
  /*const [blogs, setBlogs] = useState([])*/
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  /*
  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs))
  }, [])
  */

  /* get all blogs from backend */
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  })

  const blogs = result.data

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log("logged in as", user.username)
    }
  }, [])

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const sendNotification = (body, notifType) => {
    notificationDispatch({ type: notifType, notification: body })

    setTimeout(() => {
      notificationDispatch({ type: "hide", notification: "" })
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)
    try {
      const newUser = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(newUser))

      blogService.setToken(newUser.token)
      setUser(newUser)
      sendNotification(`${newUser.name} succesfully logged in`, "info")
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("wrong credentials")
      sendNotification("wrong username or password", "error")
    }
  }

  /* create a new blog to backend */
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)

    sendNotification(
      `a new blog: ${blogObject.title} by ${blogObject.author} added`,
      "info",
    )
  }

  /* update a blog in backend */
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })

  const updateBlog = async (blogObject) => {
    updateBlogMutation.mutate(blogObject)
    /*sendNotification(`likes increased for: ${blogObject.title} by ${blogObject.author}`, 'info')*/
  }

  /* delete blog from backend */
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      deleteBlogMutation.mutate(blogObject)
      sendNotification(
        `blog ${blogObject.title} by ${blogObject.author} was removed`,
        "info",
      )
    }
  }

  return (
    <div>
      <Notification />

      {!user && (
        <LoginForm
          handlelogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}

      {user && blogs && (
        <div>
          <h2>BLOGS</h2>

          <div>
            <LoginView user={user} setUser={setUser} />
          </div>

          <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>

          <div>
            <h3>available blogs</h3>
            <BlogView
              blogs={blogs}
              user={user}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
