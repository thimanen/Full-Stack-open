import { Form, Row, Col, Button } from "react-bootstrap"

const LoginForm = ({
  handlelogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handlelogin}>
        <Row>
          <Form.Group as={Col}>
            username
            <input
              className="form-control"
              data-testid="username"
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            password
            <input
              className="form-control"
              data-testid="password"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
