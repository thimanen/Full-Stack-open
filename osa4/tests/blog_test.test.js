const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const listHelper = require('../utils/list_helper')
const { findLastKey } = require('lodash')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listWithSeveralBlogs)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favourite blog', () => {
  test('has the most likes', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    assert.strictEqual(result, 'Canonical string reduction')
  })
})

describe('most blogs', () => {
  test('has writer who is most productive', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('has the author who gets most votes', () => {
    const result = listHelper.mostLikes(listWithSeveralBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})


/* Tehtävät 4.8 - 4.12 */

describe.only('4.8: blogilistan testit, step1', () => {
  test.only('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test.only('right nuber of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, listWithSeveralBlogs.length)
  })
})

describe.only('4.9: blogilistan testit, step2', () => {
  test.only('blog identifier is \'id\'', async () => {
    const response = await api.get('/api/blogs')
    let idInAll = true
    response.body.forEach((blog) => {
      if (!('id' in blog)) idInAll = false
    })
    assert.strictEqual(idInAll, true)
  })
})

describe.only('4.10: blogilistan testit, step3', () => {
  test.only('a blog can be added', async () => {
    const newBlog = {
      title: 'Jobs That Make a Lot of Money (17 high-paying careers in 2024)',
      author: 'Ramit Sethi',
      url: 'https://www.iwillteachyoutoberich.com/jobs-that-make-a-lot-of-money/',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    assert.strictEqual(response.body.length, listWithSeveralBlogs.length + 1)
    assert(titles.includes('Jobs That Make a Lot of Money (17 high-paying careers in 2024)'))
  })
})

describe.only('4.11: blogilistan testit, step4', () => {
  test.only('missing \'likes\' results in 0', async () => {

    /* new blog without value in the 'likes' field */
    const newBlog = {
      title: 'Jobs That Make a Lot of Money (17 high-paying careers in 2024)',
      author: 'Ramit Sethi',
      url: 'https://www.iwillteachyoutoberich.com/jobs-that-make-a-lot-of-money/',
      likes: ''
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const responseBlog = response.body.filter((blog) => blog.title === newBlog.title)
    assert('likes' in responseBlog[0])
    assert.strictEqual(responseBlog[0].likes, 0)
  })
})

describe.only('blogs without title and/or url, return 400 Bad Request', () => {
  test.only('missing title returns 400 Bad Request', async () => {
    /* new blog without the 'title' field */
    const newBlog = {
      author: 'Ramit Sethi',
      url: 'https://www.iwillteachyoutoberich.com/jobs-that-make-a-lot-of-money/',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listWithSeveralBlogs.length)

  })

  test.only('missing url returns 400 Bad Request', async () => {
    /* new blog without the 'url' field */
    const newBlog = {
      title: 'Jobs That Make a Lot of Money (17 high-paying careers in 2024)',
      author: 'Ramit Sethi',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listWithSeveralBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})



