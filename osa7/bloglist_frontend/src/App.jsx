import "./index.css"
import { useState, useEffect, useRef, useContext } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom"
import BlogView from "./components/BlogView"
import BlogForm from "./components/BlogForm"
import LoginView from "./components/LoginView"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import NotificationContext from "./NotificationContext"
import UserContext from "./UserContext"
import UsersView from "./components/UsersView"
import userService from "./services/users"
import User from "./components/User"
import Blog from "./components/Blog"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  /* get all blogs from backend */
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  })
  const blogs = result.data

  /* get all users from backend */
  const resultUsers = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  })
  const users = resultUsers.data
  console.log(users)

  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: "login", user: user })
      blogService.setToken(user.token)
      console.log("logged in as", user.username)
    }
  }, [])

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
      userDispatch({ type: "login", user: newUser })

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
      queryClient.invalidateQueries({ queryKey: ["users"] })
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
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const updateBlog = async (blogObject) => {
    updateBlogMutation.mutate({ ...blogObject, likes: blogObject.likes + 1 })
    /*sendNotification(`likes increased for: ${blogObject.title} by ${blogObject.author}`, 'info')*/
  }

  /* add comment to blog */
  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const addComment = async (blogObject, newComment) => {
    addCommentMutation.mutate({
      ...blogObject,
      comments: blogObject.comments.concat(newComment),
    })
  }

  /* delete blog from backend */
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      deleteBlogMutation.mutate(blogObject)
      navigate("/")
      sendNotification(
        `blog ${blogObject.title} by ${blogObject.author} was removed`,
        "info",
      )
    }
  }

  const padding = {
    padding: 5,
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
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <LoginView />
          <Routes>
            <Route path="/users" element={<UsersView users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route
              path="/"
              element={
                <div>
                  <div>
                    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                      <BlogForm createBlog={addBlog} />
                    </Togglable>
                  </div>

                  <div>
                    <h3>available blogs</h3>
                    <BlogView blogs={blogs} user={user} />
                  </div>
                </div>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blogs={blogs}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                  addComment={addComment}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
