const LoginForm = ({ handlelogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handlelogin}>
        <div>
          username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm