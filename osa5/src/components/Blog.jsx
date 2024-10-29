import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  
  const label = visible ? 'hide' : 'view'
  const showWhenVisible = {display: visible ? '' : 'none'}

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{label}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog