const logger = require('./logger')
const _ = require('lodash')
const User = require('../models/user')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((blog) => {
    sum += blog.likes
  })

  return sum
}


const favoriteBlog = (blogs) => {
  let max = 0
  let favourite = null
  blogs.forEach((blog) => {
    if (blog.likes > max) {
      max = blog.likes
      favourite = blog
    }
  })
  return favourite.title
}

const mostBlogs = (blogs) => {
  let freq = _.countBy(blogs, 'author')
  let author = _.maxBy(Object.keys(freq))
  let numOfBlogs = freq[author]

  return { author: author, blogs: numOfBlogs }
}

const mostLikes = (blogs) => {

  const aggregate = _.values(_.reduce(blogs, (result, obj) => {
    result[obj.author] = {
      author: obj.author,
      likes: obj.likes + (result[obj.author] ? result[obj.author].likes : 0)
    }
    return result
  }, {}))

  return _.maxBy(aggregate, (author) => author.likes)
}

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithSeveralBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  listWithOneBlog,
  listWithSeveralBlogs,
  usersInDb,
}

