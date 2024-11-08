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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Teemu Teekkari',
        username: 'tteekkari',
        password: 'salasana'
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

      test('it can be removed by creator', async ({page}) => {
        await expect(page.getByText('first blog first author')).toBeVisible()
        await page.getByRole('button', {name: 'view'}).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', {name: 'remove'}).click()
        await expect(page.getByText('first blog first author')).not.toBeVisible()
      })
    })
  })

  describe('Login with one user', () => {
    test('and create a blog. Login with another user and do not see remove button', async ({page}) => {
      await loginWith(page, 'thimanen', 'salainen salasana')
      await createBlog(page, 'first blog', 'first author', 'first url')
      await page.getByRole('button', {name: 'logout'}).click()
      await loginWith(page, 'tteekkari', 'salasana')
      await expect(page.getByText('first blog first author')).toBeVisible()
      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByRole('button', {name: 'remove'})).toBeHidden()

    })
  })

  describe('Arrange blogs', () => {
    test('in the order of most likes', async ({page}) => {
      await loginWith(page, 'thimanen', 'salainen salasana')
      await createBlog(page, 'first blog', 'first author', 'first url')
      await createBlog(page, 'second blog', 'second author', 'second url')
      await createBlog(page, 'third blog', 'third author', 'third url')

      /* first blog get 1 like */
      await page.getByText('first blog first author').getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
      await page.getByText('first blog first author').getByRole('button', {name: 'hide'}).click()

      /* second blog get 2 likes */
      await page.getByText('second blog second author').getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('likes: 2')).toBeVisible()
      await page.getByText('second blog second author').getByRole('button', {name: 'hide'}).click()

      /* third blog get 3 likes */
      await page.getByText('third blog third author').getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('likes: 3')).toBeVisible()
      await page.getByText('third blog third author').getByRole('button', {name: 'hide'}).click()

      /* now verify the order of the blogs */

      const actualOrderOfBlogElements = 
      await page.$$eval('.blog', elements => {
        return elements.map(element => element.textContent.split('view',1))
      })
      
      const expectedOrderOfBlogElements = [
        ['third blog third author'],
        ['second blog second author'],
        ['first blog first author']
      ]

      expect(actualOrderOfBlogElements).toEqual(expectedOrderOfBlogElements)
    })
  })
})

