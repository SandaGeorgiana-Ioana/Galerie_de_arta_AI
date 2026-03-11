const { test, expect } = require('@playwright/test');

test.setTimeout(180000);

test('Homepage welcome -> Login -> About page -> Dress page with generated image', async ({ page }) => {
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
    await expect(page.locator('#page')).toHaveText(/about us/i);
    await expect(page.locator('.about-section')).toBeVisible();
    await expect(page.locator('.about-card')).toHaveCount(7);
    await expect(page.locator('.greeting')).toContainText('Hello');

    await page.hover('a[href="/art"]');
    await page.click('a[href="/dress"]');
    await page.waitForURL('**/dress', { timeout: 5000 });
    await expect(page.locator('#pageTitle')).toHaveText('Dress');

    const dressProducts = page.locator('.product');
    expect(await dressProducts.count()).toBeGreaterThan(0);
    const firstDress = dressProducts.first();
    await expect(firstDress.locator('button.addCart')).toBeVisible();
    await expect(firstDress.locator('button.generateBtn')).toBeVisible();

    const image = firstDress.locator('img.rotating-image');
    await expect(image).toBeVisible();
    await image.hover();
    await page.waitForTimeout(1500);

    await firstDress.locator('button.generateBtn').click();

    const generatedImage = firstDress.locator('.result img');
    await expect(generatedImage).toBeVisible({ timeout: 150000 });

    await generatedImage.evaluate(async (img) => {
        if (img.complete) return true;
        await new Promise((resolve, reject) => {
            img.onload = () => resolve(true);
            img.onerror = () => reject(new Error('Imaginea nu s-a încărcat'));
        });
    });

    const naturalWidth = await generatedImage.evaluate(img => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    const display = await generatedImage.evaluate(el => getComputedStyle(el).display);
    const visibility = await generatedImage.evaluate(el => getComputedStyle(el).visibility);
    const opacity = await generatedImage.evaluate(el => getComputedStyle(el).opacity);

    expect(display).toBe('block');
    expect(visibility).toBe('visible');
    expect(parseFloat(opacity)).toBeGreaterThan(0);

    await generatedImage.screenshot({ path: 'generated-image.png' });

    const generatedSrc = await generatedImage.getAttribute('src');
    expect(generatedSrc).toBeTruthy();
    expect(generatedSrc).toMatch(/^https?:\/\//);

    await page.waitForTimeout(3000);
});
