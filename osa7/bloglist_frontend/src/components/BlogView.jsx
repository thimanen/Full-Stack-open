import Blog from "./Blog"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const BlogView = ({ blogs, user }) => {
  const updateLikes = (originalBlog) => {
    const newBlog = {
      title: originalBlog.title,
      author: originalBlog.author,
      url: originalBlog.url,
      id: originalBlog.id,
      likes: originalBlog.likes + 1,
      user: originalBlog.user.id,
    }
    updateBlog(newBlog)
  }

  let blogsToShow = []
  if (blogs.length && user) {
    blogs.sort((a, b) => b.likes - a.likes)
    /* blogsToShow = blogs.filter(blog => blog.user.username === user.username) */
    blogsToShow = blogs

    return (
      <div>
        {blogsToShow && (
          <Table striped>
            <tbody>
              {blogsToShow.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    )
  }

  return null
}


/* blogs, user, updateBlog, deleteBlog */
BlogView.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogView
