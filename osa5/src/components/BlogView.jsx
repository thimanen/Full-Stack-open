import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogView = ({ blogs, user, updateBlog, deleteBlog }) => {

  const updateLikes = (originalBlog) => {

    const newBlog = {
      title: originalBlog.title,
      author: originalBlog.author,
      url: originalBlog.url,
      id: originalBlog.id,
      likes: originalBlog.likes + 1,
      user: originalBlog.user.id
    }
    updateBlog(newBlog)
  }

  let blogsToShow = []
  if (blogs.length && user) {
    blogs.sort((a, b) => b.likes - a.likes)
    blogsToShow = blogs.filter(blog => blog.user.username === user.username)

    return(
      <div>
        {blogsToShow &&
          <div>
            {blogsToShow.map(blog => <Blog key={blog.id} blog={blog} addLikesByOne={updateLikes} removeBlog={deleteBlog} />)}
          </div>
        }
      </div>
    )
  }

  return null
}

/* blogs, user, updateBlog, deleteBlog */
BlogView.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogView