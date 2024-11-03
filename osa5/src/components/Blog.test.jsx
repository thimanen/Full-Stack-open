import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('5.13: blogilistan testit, step1', () => {
  test('renders only blog title', () => {
    const blog = {
      title: 'this is test title',
      author: 'Test Author',
      url: 'test_url',
      likes: 0,
      user: {
        name: 'Test Name',
      },
    }

    const likesMockHandler = vi.fn()
    const removeMockHandler = vi.fn()

    render(<Blog blog={blog} addLikesByOne={likesMockHandler} removeBlog={removeMockHandler} />)

    const element_title = screen.getByText(/this is test title/)
    expect(element_title).toBeDefined()
  })

  test('renders only blog author', () => {
    const blog = {
      title: 'this is test title',
      author: 'Test Author',
      url: 'test_url',
      likes: 0,
      user: {
        name: 'Test Name',
      },
    }

    const likesMockHandler = vi.fn()
    const removeMockHandler = vi.fn()

    render(<Blog blog={blog} addLikesByOne={likesMockHandler} removeBlog={removeMockHandler} />)

    const element_author = screen.getByText(/Test Author/)
    expect(element_author).toBeDefined()
  })

  test('does not render likes', () => {
    const blog = {
      title: 'this is test title',
      author: 'Test Author',
      url: 'test_url',
      likes: 0,
      user: {
        name: 'Test Name',
      },
    }

    const likesMockHandler = vi.fn()
    const removeMockHandler = vi.fn()

    const container = render(<Blog blog={blog} addLikesByOne={likesMockHandler} removeBlog={removeMockHandler} />).container

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })
})