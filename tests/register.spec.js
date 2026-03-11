const { test, expect } = require('@playwright/test');

test('Homepage shows welcome, then user registers and reaches login page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const mainTitle = page.locator('#text_logo');
    await expect(mainTitle).toHaveText(/Infinite palette/i);
    const welcomeMessage = page.locator('#page');
    await expect(welcomeMessage).toHaveText(/~ welcome ~/i);

    await page.click('button:has-text("Register")');
    await page.waitForURL('**/register');

    const randomId = Date.now();
    await page.fill('input[name="user_name"]', `user${randomId}`);
    await page.fill('input[name="password"]', 'Test1234!');
    await page.fill('input[name="first_name"]', 'Ana');
    await page.fill('input[name="last_name"]', 'Pop');
    await page.fill('input[name="email"]', `ana${randomId}@example.com`);

    await page.click('button[type="submit"]');
    await page.waitForURL('**/login', { timeout: 10000 });
    await expect(page).toHaveURL(/\/login$/);
    await page.waitForTimeout(3000);
});
