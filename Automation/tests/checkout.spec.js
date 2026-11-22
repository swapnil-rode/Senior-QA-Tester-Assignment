import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';
const PASSWORD = 'secret_sauce';

// TC_01: Valid Login
test('TC_01 - Verify successful login', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

// TC_02: Invalid Password
test('TC_02 - Verify login with invalid password', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('wrong_password');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});

// TC_03: Empty Username
test('TC_03 - Verify login with empty username', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username is required');
});

// TC_04: Empty Password
test('TC_04 - Verify login with empty password', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Password is required');
});

// TC_05: Locked Out User
test('TC_05 - Verify locked out user login', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out');
});

// TC_06: Product Listing
test('TC_06 - Verify product listing', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('.inventory_item')).toHaveCount(6);
});

// TC_07: Add Product to Cart
test('TC_07 - Verify adding product to cart', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// TC_08: Remove Product from Cart
test('TC_08 - Verify removing product from cart', async ({ page }) => {
  await page.goto(URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  await expect(page.locator('.cart_item')).toHaveCount(0);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});
