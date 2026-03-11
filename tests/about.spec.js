const { test, expect } = require('@playwright/test');

test('Homepage shows welcome, then user logs in and sees full About page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const mainTitle = page.locator('#text_logo');
    await expect(mainTitle).toHaveText(/Infinite palette/i);

    const welcomeMessage = page.locator('#page');
    await expect(welcomeMessage).toHaveText(/~ welcome ~/i);

    await page.click('button:has-text("Login")');
    await page.waitForURL('**/login');

    await page.fill('input[name="username"]', 'SandaGeorgiana2002');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/about', { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/about$/);

    const pageTitle = page.locator('#page');
    await expect(pageTitle).toHaveText(/about us/i);
    await expect(page.locator('.about-section')).toBeVisible();
    await expect(page.locator('.about-card')).toHaveCount(7);
    await expect(page.locator('.greeting')).toContainText('Hello');

    await expect(page.locator('a.show', { hasText: 'See our art now' })).toBeVisible();
    await expect(page.locator('a.show', { hasText: 'See our artists now' })).toBeVisible();
    for (let i = 0; i < 10; i++) {
        await page.mouse.wheel(0, 150);
        await page.waitForTimeout(200);
    }
    const targetButton = page.locator('a.show', { hasText: 'See our art now' });

    let isVisible = await targetButton.isVisible();
    let attempts = 0;
    while (!isVisible && attempts < 10) {
        await page.mouse.wheel(0, -150);
        await page.waitForTimeout(200);
        isVisible = await targetButton.isVisible();
        attempts++;
    }
    await targetButton.click();
    await page.waitForURL('**/art', { timeout: 5000 });
    await expect(page).toHaveURL('http://localhost:3000/art');
    await page.waitForTimeout(3000);

});