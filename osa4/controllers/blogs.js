const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name : 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response
      .status(401) /* UNAUTHORIZED */
      .json({ error: 'token invalid' })
  }

  const user = request.user

  if(!user._id) {
    return response
      .status(401) /* UNAUTHORIZED */
      .json({ error: 'user invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response
    .status(201) /* CREATED */
    .json(savedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response
      .status(401) /* UNAUTHORIZED */
      .json({ error: 'token missing or invalid' })
  }

  const user = request.user
  if(!user._id) {
    return response
      .status(401) /* UNAUTHORIZED */
      .json({ error: 'user invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  if(blog === null) {
    return response
      .status(404) /* NOT FOUND */
      .json({ error: 'blog does not exist' })
  }

  if(blog.user.toString() !== user._id.toString()) {
    return response
      .status(401) /* UNAUTHORIZED */
      .json({ error: 'wrong user' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response
    .status(204) /* NO CONTENT */
    .end()


})

blogsRouter.put('/:id', async (request, response) => {
  const blogBody = request.body

  const blog = {
    title: blogBody.title,
    author: blogBody.author,
    url: blogBody.url,
    likes: blogBody.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).end()

})

module.exports = blogsRouter