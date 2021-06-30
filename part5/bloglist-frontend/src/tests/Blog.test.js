import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  test('renders the title and author, but does not render url or likes', () => {
    const blog = {
      title: 'Component testing with react-testing-library',
      author: 'The Author',
      url: 'https://localhost/a-blog-post',
      likes: 210
    }

    const component = render(<Blog key="123abc" blog={blog}/>)
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
  })

  test('clicking Show button renders the url and likes', () => {
    const blog = {
      title: 'Component testing with react-testing-library',
      author: 'The Author',
      url: 'https://localhost/a-blog-post',
      likes: 210
    }

    const component = render(<Blog key="123abc" blog={blog} />)
    const button = component.container.querySelector('.blog-view-btn')
    fireEvent.click(button)
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })

  test('clicking like button twice calls event handler twice', () => {
    const blog = {
      title: 'Component testing with react-testing-library',
      author: 'The Author',
      url: 'https://localhost/a-blog-post',
      likes: 210
    }

    const mockHandler = jest.fn()
    const component = render(<Blog key="123abc" blog={blog} likeHandler={mockHandler} />)
    const button = component.container.querySelector('.blog-view-btn')
    fireEvent.click(button)

    const likeButton = component.getByText('+')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})