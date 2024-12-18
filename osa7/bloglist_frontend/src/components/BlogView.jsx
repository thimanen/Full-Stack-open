import Blog from "./Blog"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

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
          <div className="blogsToView">
            {blogsToShow.map((blog) => (
              <div className="blog" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
}

/*
<Blog
                key={blog.id}
                blog={blog}
                addLikesByOne={updateLikes}
                removeBlog={deleteBlog}
                currentUser={user}
              />
*/

/* blogs, user, updateBlog, deleteBlog */
BlogView.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogView
