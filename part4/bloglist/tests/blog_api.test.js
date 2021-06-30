/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')


let jwt = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testuser', passwordHash })
  const savedUser = await user.save()

  for (const initialBlog of helper.initialBlogs) {
    const blogObject = new Blog({
      title: initialBlog.title,
      author: initialBlog.author,
      url: initialBlog.url,
      likes: initialBlog.likes,
      user: savedUser.id
    })
    await blogObject.save()
  }

  const response = await api.post('/api/login').send({ username: 'testuser', password: 'sekret' })
  jwt = `bearer ${response.body.token}`
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blogs is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'React patterns'
    )
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 id is invalid', async () => {
    const invalidId = 'a'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: jwt })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInEnd = await helper.blogsInDb()
    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsInEnd.map(n => n.title)
    expect(titles).toContain('Type wars')
  })

  test('fails with missing or invalid jwt', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' })
      .send(newBlog)
      .expect(401)
  })

  test('fails with status code 400 if data invaild', async () => {
    const newBlog = {
      author: 'Famous Person',
      url: 'https://example.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: jwt })
      .send(newBlog)
      .expect(400)

    const blogsInEnd = await helper.blogsInDb()
    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('when title and url are missing, responds with error 400', async () => {
    const newBlog = {
      author: 'Famous Person',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: jwt })
      .send(newBlog)
      .expect(400)
  })

  test('when the likes property is missing, it is 0', async () => {
    const newBlog = {
      title: 'Missing property',
      author: 'Java Script',
      url: 'this_is_a_url',
    }

    const resultBlog = await api
      .post('/api/blogs')
      .set({ Authorization: jwt })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.likes).toBe(0)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: jwt })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 id is invalid', async () => {
    const invalidId = 'a'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set({ Authorization: jwt })
      .expect(400)
  })
})

describe('modification of a blog by adding likes', () => {
  test('succeeds with status code 204 if id and the amount of likes is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]
    const data = {
      likes: 300
    }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(data)
      .expect(200)

    const editedBlog = await helper.getBlog(blogToEdit.id)
    expect(editedBlog.likes).toBe(300)
  })

  test('fails with status code 400 id is invalid', async () => {
    const invalidId = 'a'
    const data = {
      likes: 300
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(data)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
