const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next (exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blogBody = request.body

  const blog = {
    title: blogBody.title,
    author: blogBody.author,
    url: blogBody.url,
    likes: blogBody.likes
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).end()
  } catch (exception) {
    next (exception)
  }
})

module.exports = blogsRouter