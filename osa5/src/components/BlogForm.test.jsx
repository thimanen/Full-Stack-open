import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('5.16: blogilistan testit, step4', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const input_title = screen.getByPlaceholderText('write title here')
    const input_author = screen.getByPlaceholderText('write author here')
    const input_url = screen.getByPlaceholderText('write url here')
    const sendButton = screen.getByText(/\bcreate\b/)

    await user.type(input_title, 'test title')
    await user.type(input_author, 'test author')
    await user.type(input_url, 'test url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')



  })
})