const listHelper = require('../utils/list_helper')
const blogs = require('./test_data/mongo_blogs.json')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('equals to the right amount of total likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('equals to the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toStrictEqual({"title": "Canonical string reduction", "author": "Edsger W. Dijkstra", "likes": 12})
  })
})

describe('most blogs', () => {
  test('equals to the author with most blogs with the amount', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toStrictEqual({"author": "Robert C. Martin", "blogs": 3})
  })
})

describe('most likes', () => {
  test('equals to the author with most likes in all blogs with the amount', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toStrictEqual({"author": "Edsger W. Dijkstra", "likes": 17})
  })
})
