const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  const result = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })

  return { title: result.title, author: result.author, likes: result.likes }
}

const mostBlogs = (blogs) => {
  const authors = new Map()

  blogs.forEach(blog => {
    const blogAmount = 1 + (authors.get(blog.author) || 0)
    authors.set(blog.author, blogAmount)
  })

  const result = Array.from(authors.entries()).reduce(function(prev, current) {
    return (prev[1] > current[1]) ? prev : current
  })

  return { 'author': result[0], 'blogs': result[1] }
}

const mostLikes = (blogs) => {
  const likes = new Map()

  blogs.forEach(blog => {
    const likeAmount = blog.likes + (likes.get(blog.author) || 0)
    likes.set(blog.author, likeAmount)
  })

  const result = Array.from(likes.entries()).reduce(function(prev, current) {
    return (prev[1] > current[1]) ? prev : current
  })

  return { 'author': result[0], 'likes': result[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
