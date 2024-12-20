import { useContext } from "react"
import UserContext from "../UserContext"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

const Blog = ({ blogs, updateBlog, deleteBlog }) => {
  if (!blogs) {
    return null
  }
  const [user, userDispatch] = useContext(UserContext)

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const isOwner = blog.user.username === user.username
  const showIfOwner = { display: isOwner ? "" : "none" }

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
