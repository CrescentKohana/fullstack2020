import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  test('returns props with the right details when a new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('#form-blog')

    fireEvent.change(inputTitle, { target: { value: 'Kagetsu' } })
    fireEvent.change(inputAuthor, { target: { value: 'Akiha' } })
    fireEvent.change(inputUrl, { target: { value: 'https://localhost' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Kagetsu')
    expect(createBlog.mock.calls[0][0].author).toBe('Akiha')
    expect(createBlog.mock.calls[0][0].url).toBe('https://localhost')
  })

  test('updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  })
})
