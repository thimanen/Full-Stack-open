import { useContext } from "react"
import UserContext from "../UserContext"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

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
    event.target.comment.value=''
    addComment(blog, content)
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url} </a>
      <div>
        likes: {blog.likes}
        <button onClick={() => updateBlog(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <span style={showIfOwner}>
        <button className="button" onClick={() => deleteBlog(blog)}>
          remove
        </button>
      </span>
      <h3>comments</h3>

      <form onSubmit={onCreate}>
        <input name="comment" />
        <button type="submit">create comment</button>
      </form>

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
