const { test, expect } = require('@playwright/test');
test.setTimeout(120000);

test('Homepage -> Login -> About -> Acrylic -> Scroll + Generate image', async ({ page }) => {

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
    await page.click('a[href="/acrylic"]');
    await page.waitForURL('**/acrylic');
    await expect(page.locator('#pageTitle')).toHaveText('Acrylic');

    const firstProduct = page.locator('.product').first();
    await expect(firstProduct.locator('button.generateBtn')).toBeVisible();

    let scrollStep = 0;
    while (true) {
        const previousY = await page.evaluate(() => window.scrollY);
        await page.mouse.wheel(0, 200);
        await page.waitForTimeout(150);
        const newY = await page.evaluate(() => window.scrollY);
        scrollStep++;
        if (newY === previousY || scrollStep > 30) break;
    }

    let upStep = 0;
    while (true) {
        const previousY = await page.evaluate(() => window.scrollY);
        await page.mouse.wheel(0, -200);
        await page.waitForTimeout(100);
        const newY = await page.evaluate(() => window.scrollY);
        upStep++;
        if (newY === 0 || newY === previousY || upStep > 40) break;
    }

    await firstProduct.locator('button.generateBtn').click();

    const generatedImage = firstProduct.locator('.result img');
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

    await generatedImage.screenshot({ path: 'generated-acrylic-image.png' });

    const src = await generatedImage.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toMatch(/^https?:\/\//);

    await page.waitForTimeout(2000);
});
