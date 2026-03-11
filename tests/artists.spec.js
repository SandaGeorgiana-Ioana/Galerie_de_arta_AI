const { test, expect } = require('@playwright/test');

test('Homepage shows welcome, then user logs in, sees Artists, and navigates to artist page (BIA)', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const mainTitle = page.locator('#text_logo');
    await expect(mainTitle).toHaveText(/Infinite palette/i);
    const welcomeMessage = page.locator('#page');
    await expect(welcomeMessage).toHaveText(/~ welcome ~/i);

    await page.click('button:has-text("Login")');
    await page.waitForURL(/.*\/login$/, { timeout: 5000 });

    await page.fill('input[name="username"]', 'SandaGeorgiana2002');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');

    await page.click('a[href="/artists"]');
    await expect(page.locator('#page')).toHaveText(/~ our artists ~/i);
    await expect(page.locator('.greeting')).toContainText('Hello');

    await page.hover('a[href="/artists"]');
    await page.click('a[href="/bia"]');
    await page.waitForURL(/.*\/bia$/, { timeout: 5000 });
    const biaLink = page.locator('.show[href="/bia"]');
    await page.waitForTimeout(3000);

    await page.hover('a[href="/artists"]');
    await page.click('a[href="/georgi"]');
    await page.waitForURL(/.*\/georgi$/, { timeout: 5000 });
    await page.waitForTimeout(3000);

    await page.hover('a[href="/artists"]');
    await page.click('a[href="/marian"]');
    await page.waitForURL(/.*\/marian$/, { timeout: 5000 });
    await page.waitForTimeout(3000);
});
