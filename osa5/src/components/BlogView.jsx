import Blog from './Blog'

const BlogView = ({ blogs, user }) => {

  let blogsToShow = []
  if (blogs.length && user) {
    blogsToShow = blogs.filter(blog => blog.user.username === user.username)

    return(
      <div>
        {blogsToShow &&
          <div>
            {blogsToShow.map(blog => <Blog key={blog.id} blog={blog} />)}
          </div>
        }
      </div>
    )
  }

  return null
}

export default BlogView