const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('thimanen')
      await page.getByTestId('password').fill('salainen salasana')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Teemu Himanen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByTestId('username').fill('tteekkari')
      await page.getByTestId('password').fill('wrong password')
      await page.getByRole('button', {name: 'login'}).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })
})

