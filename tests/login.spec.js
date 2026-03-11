const { test, expect } = require('@playwright/test');

test('Homepage shows welcome, then user logs in and sees about page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const mainTitle = await page.locator('#text_logo');
    await expect(mainTitle).toHaveText(/Infinite palette/i);
    const welcomeMessage = await page.locator('#page');
    await expect(welcomeMessage).toHaveText(/~ welcome ~/i);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/login');
    await page.fill('input[name="username"]', 'SandaGeorgiana2002');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/about');
    await page.waitForURL('http://localhost:3000/about');
    const greeting = page.locator('.greeting');
    await expect(greeting).toContainText('Hello');
});
