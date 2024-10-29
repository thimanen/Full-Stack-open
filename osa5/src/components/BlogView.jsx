import Blog from './Blog'

const BlogView = ({ blogs, user, updateBlog }) => {

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
            {blogsToShow.map(blog => <Blog key={blog.id} blog={blog} addLikesByOne={updateLikes} />)}
          </div>
        }
      </div>
    )
  }

  return null
}

export default BlogView