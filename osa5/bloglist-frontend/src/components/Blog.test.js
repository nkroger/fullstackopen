import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const randomLikes = () => {
  return Math.floor( 100 * Math.random() )
}

test('renders content', () => {
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

  render(<Blog blog={blog} user={blogUser} />)

  const element = screen.getByText(blogTitle, { exact: false })
  expect(element).toBeDefined()
})
