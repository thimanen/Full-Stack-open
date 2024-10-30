const LoginView = ({ user, setUser }) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  return (
    <div>
      <p>
        {user.name} logged in

        <button onClick={handleLogout}>
            logout
        </button>
      </p>
    </div>
  )
}

export default LoginView