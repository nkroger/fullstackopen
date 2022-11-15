import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const randomLikes = () => {
  return Math.floor( 100 * Math.random() )
}

const blogTitle = 'Testing component blog with react-testing-library'

const blogUser = {
  username: 'testusername',
  name: 'Test Name'
}

const blog = {
  title: blogTitle,
  author: 'Test Author',
  likes: randomLikes(),
  url: 'https://www.testblog.nu/testarticle',
  user: blogUser
}

test('renders content', () => {

  render(<Blog blog={blog} user={blogUser} />)

  const element = screen.getByText(blogTitle, { exact: false })
  expect(element).toBeDefined()
})

describe('when blog view is extended', () => {
  let container

  beforeEach(async () => {
    container = render(<Blog blog={blog} user={blogUser}/>).container
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
  })

  test('url is rendered', () => {
    const element = screen.getByText(blog.url, { exact: false })
    expect(element).toBeDefined()
    expect(element).not.toHaveStyle('display: none')
  })

  test('likes are rendered correctly', () => {
    const element = screen.getByText('likes', { exact: false })
    expect(element).toBeDefined()
    expect(element).not.toHaveStyle('display: none')
    expect(element.innerHTML).toMatch(new RegExp(`${blog.likes}`))
  })

  test('author is rendered', () => {
    const element = screen.getByText(blog.author, { exact: false })
    expect(element).toBeDefined()
  })

})

test('clicking like button calls eventhandler once', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} user={blogUser} likeHandler={mockHandler}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  // Click again and expect 2 clicks
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
