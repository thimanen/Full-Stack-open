import { useContext } from "react"
import UserContext from "../UserContext"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import { Button, Form, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

const Blog = ({ blogs, updateBlog, deleteBlog, addComment }) => {
  if (!blogs) {
    return null
  }
  const [user, userDispatch] = useContext(UserContext)

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const isOwner = blog.user.username === user.username
  const showIfOwner = { display: isOwner ? "" : "none" }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ""
    addComment(blog, content)
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Table>
        <tbody>
          <tr>
            <td>
              <Link to={blog.url}>{blog.url}</Link>
            </td>
          </tr>
          <tr>
            <td>
              likes: {blog.likes}
              <Button variant="secondary" onClick={() => updateBlog(blog)}>
                like
              </Button>
            </td>
          </tr>
          <tr>
            <td>added by {blog.user.name}</td>
          </tr>
        </tbody>
      </Table>
      <span style={showIfOwner}>
        <Button variant="danger" onClick={() => deleteBlog(blog)}>
          remove
        </Button>
      </span>
      <h3>comments</h3>

      <Form onSubmit={onCreate}>
        <Form.Group>
          <input name="comment" placeholder="write comment here" />
          <Button variant="primary" type="submit">
            create comment
          </Button>
        </Form.Group>
      </Form>

      <ul>
        {blog.comments.map((comment, key) => {
          return <li key={key}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
