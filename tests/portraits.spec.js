const { test, expect } = require('@playwright/test');

test.setTimeout(180000);
test('Homepage welcome -> Login -> About -> Portraits page -> Scroll down, up, then generate image for first portrait', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('#text_logo')).toHaveText(/Infinite palette/i);
    await expect(page.locator('#page')).toHaveText(/~ welcome ~/i);

    await page.click('button:has-text("Login")');
    await page.waitForURL('**/login');
    await page.fill('input[name="username"]', 'SandaGeorgiana2002');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/about', { timeout: 10000 });
    await expect(page.locator('#page')).toHaveText(/about us/i);
    await expect(page.locator('.about-section')).toBeVisible();
    await expect(page.locator('.about-card')).toHaveCount(7);
    await expect(page.locator('.greeting')).toContainText('Hello');

    await page.hover('a[href="/art"]');
    await page.click('a[href="/portraits"]');
    await page.waitForURL('**/portraits', { timeout: 5000 });
    await expect(page.locator('#pageTitle')).toHaveText('Pencil portraits');

    for (let i = 0; i < 5; i++) {
        await page.mouse.wheel(0, 150);
        await page.waitForTimeout(100);
    }

    for (let i = 0; i < 5; i++) {
        await page.mouse.wheel(0, -150);
        await page.waitForTimeout(100);
    }

    const firstPortrait = page.locator('.product').first();

    await expect(firstPortrait.locator('button.addCart')).toBeVisible();
    await expect(firstPortrait.locator('button.generateBtn')).toBeVisible();

    const image = firstPortrait.locator('img.rotating-image');
    await expect(image).toBeVisible();
    await image.hover();
    await page.waitForTimeout(1000);

    await firstPortrait.locator('button.generateBtn').click();

    const generatedImage = firstPortrait.locator('.result img');
    await expect(generatedImage).toBeVisible({ timeout: 150000 });

    await generatedImage.evaluate(async (img) => {
        if (img.complete) return true;
        await new Promise((resolve, reject) => {
            img.onload = () => resolve(true);
            img.onerror = () => reject(new Error('Image failed to load'));
        });
    });

    const naturalWidth = await generatedImage.evaluate(img => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    await generatedImage.screenshot({ path: 'generated-portrait-1.png' });

    const src = await generatedImage.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toMatch(/^https?:\/\//);

    await page.waitForTimeout(3000);
});
