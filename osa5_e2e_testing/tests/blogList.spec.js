const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('BlogList', () => {
  beforeEach(async ({page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Teemu Himanen',
        username: 'thimanen',
        password: 'salainen salasana'
      }
    })

    await page.goto('http://localhost:3000')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {
      await loginWith(page, 'thimanen', 'salainen salasana')
      await expect(page.getByText('Teemu Himanen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await loginWith(page, 'tteekkari', 'wrong password')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({page}) => {
      await loginWith(page, 'thimanen', 'salainen salasana')
      await expect(page.getByText('Teemu Himanen logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({page}) => {
      await createBlog(page, 'first blog', 'first author', 'first url')
      await expect(page.getByText('first blog first author')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({page}) => {
        await createBlog(page, 'first blog', 'first author', 'first url')
      })

      test('it can be liked', async( {page}) => {
        await page.getByRole('button', {name: 'view'}).click()
        await expect(page.getByText('likes: 0')).toBeVisible()
        await page.getByRole('button', {name: 'like'}).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
      })
    })
  })
})

