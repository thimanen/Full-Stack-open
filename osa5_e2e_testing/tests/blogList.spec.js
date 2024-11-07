const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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
      await page.getByRole('button', {name: 'create new blog'}).click()
      
      await page.getByTestId('title').fill('first blog')
      await page.getByTestId('author').fill('first author')
      await page.getByTestId('url').fill('first url')
      await page.getByRole('button', {name: 'create'}).click()

      await expect(page.getByText('first blog first author')).toBeVisible()
    })
  })
})

