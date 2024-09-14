require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

/* const mongoUrl = 'mongodb://localhost/bloglist'*/
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

/* print the Mongodb database address */
console.log(`Connected to mongoDB: ${process.env.MONGODB_URI}`)

app.use(cors())
app.use(express.json())

/* Route for root to test the server*/
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})