const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const listHelper = require('../utils/list_helper')
const { findLastKey } = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.listWithSeveralBlogs)
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
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.listWithSeveralBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favourite blog', () => {
  test('has the most likes', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithSeveralBlogs)
    assert.strictEqual(result, 'Canonical string reduction')
  })
})

describe('most blogs', () => {
  test('has writer who is most productive', () => {
    const result = listHelper.mostBlogs(listHelper.listWithSeveralBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('has the author who gets most votes', () => {
    const result = listHelper.mostLikes(listHelper.listWithSeveralBlogs)
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

    assert.strictEqual(response.body.length, listHelper.listWithSeveralBlogs.length)
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
      .expect(201) /* CREATED */
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    assert.strictEqual(response.body.length, listHelper.listWithSeveralBlogs.length + 1)
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
      .expect(201) /* CREATED */
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const responseBlog = response.body.filter((blog) => blog.title === newBlog.title)
    assert('likes' in responseBlog[0])
    assert.strictEqual(responseBlog[0].likes, 0)
  })
})

describe.only('4.12: blogilistan testit, step5', () => {
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
      .expect(400) /* BAD REQUEST */

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listHelper.listWithSeveralBlogs.length)

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
      .expect(400) /* BAD REQUEST */

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listHelper.listWithSeveralBlogs.length)
  })
})

describe.only('4.13: blogilistan laajennus, step1', () => {
  test.only('removing succesfully a blog returns 204 No Content', async () => {
    const allBlogsAtStart = await api.get('/api/blogs')
    const blogToDelete = allBlogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204) /* NO CONTENT */

    const allBlogsAtEnd = await api.get('/api/blogs')
    const titles = allBlogsAtEnd.body.map(blog => blog.title)

    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(allBlogsAtEnd.body.length, listHelper.listWithSeveralBlogs.length - 1)

  })
})

describe.only('4.14: blogilistan laajennus, step2', () => {
  test.only('modify the \'likes\' value in blog', async () => {
    const allBlogsAtStart = await api.get('/api/blogs')
    const blogToModify = allBlogsAtStart.body[0]

    blogToModify.likes += 1

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(201) /* CREATED */

    const allBlogs = await api.get('/api/blogs')
    const modifiedBlog = allBlogs.body.filter((blog) => blog.id === blogToModify.id)

    assert.strictEqual(modifiedBlog[0].likes, blogToModify.likes)
  })
})

describe.only('4.15: blogilistan laajennus, step3:', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash
    })

    await user.save()
  })

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'tteekkari',
      name: 'Teemu Teekkari',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201) /* CREATED */
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test.only('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('creation fails with proper statuscode and message if username is missing or invalid', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: '',
      name: 'Teemu Teekkari',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400) /* BAD REQUEST */
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('User validation failed'))
  })

  test.only('creation fails with proper statuscode and message if password is missing or invalid', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'tteekkari',
      name: 'Teemu Teekkari',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400) /* BAD REQUEST */
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('password missing or too short'))
  })

})


after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})



