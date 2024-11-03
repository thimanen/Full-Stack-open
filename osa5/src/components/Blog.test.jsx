import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('5.13: blogilistan testit, step1', () => {
  
  const likesMockHandler = vi.fn()
  const removeMockHandler = vi.fn()
 
  const blog = {
    title: 'this is test title',
    author: 'Test Author',
    url: 'test_url',
    likes: 0,
    user: {
      name: 'Test Name',
    },
  }

  test('renders only blog title', () => {
    render(<Blog blog={blog} addLikesByOne={likesMockHandler} removeBlog={removeMockHandler} />)

    const element_title = screen.getByText(/this is test title/)
    expect(element_title).toBeDefined()
  })

  test('renders only blog author', () => {
    render(<Blog blog={blog} addLikesByOne={likesMockHandler} removeBlog={removeMockHandler} />)

    const element_author = screen.getByText(/Test Author/)
    expect(element_author).toBeDefined()
  })

  test('does not render likes', () => {
    const container = render(<Blog blog={blog} addLikesByOne={likesMockHandler} removeBlog={removeMockHandler} />).container

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })
})

describe('5.14: blogilistan testit, step2', () => {
  const likesMockHandler = vi.fn()
  const removeMockHandler = vi.fn()

  
  const blog = {
    title: 'this is test title',
    author: 'Test Author',
    url: 'test_url',
    likes: 0,
    user: {
      name: 'Test Name',
    },
  }
  
  test('url, likes and user are shown if button is pressed', async () => {
    const container = render(<Blog 
      blog={blog} 
      addLikesByOne={likesMockHandler} 
      removeBlog={removeMockHandler} />).container

    const user = userEvent.setup()
    const button = screen.getByText(/view/)
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

