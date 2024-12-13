import { useContext } from "react"
import UserContext from "../UserContext"

const LoginView = () => {
  const [user, userDispatch] = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    userDispatch({ type: "logout", user: "" })
  }

  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default LoginView
