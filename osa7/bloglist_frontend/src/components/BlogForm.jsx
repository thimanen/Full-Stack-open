import { useState } from "react"
import PropTypes from "prop-types"
import { Form, Button } from "react-bootstrap"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    createBlog(newBlog)
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <input
            className="form-control"
            data-testid="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="write title here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <input
            className="form-control"
            data-testid="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="write author here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <input
            className="form-control"
            data-testid="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="write url here"
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            create
          </Button>
        </div>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
