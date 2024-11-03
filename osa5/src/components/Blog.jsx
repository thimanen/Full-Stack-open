import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikesByOne, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const label = visible ? 'hide' : 'view'
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{label}</button>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={() => addLikesByOne(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button className='button' onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikesByOne: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog