import { useContext } from "react"
import UserContext from "../UserContext"
import { Button } from "react-bootstrap"

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
        <Button variant="danger" onClick={handleLogout}>
          logout
        </Button>
      </p>
    </div>
  )
}

export default LoginView
