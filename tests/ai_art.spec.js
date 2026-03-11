const { test, expect } = require('@playwright/test');
const path = require('path');

test.setTimeout(120000);

test('Upload local image and generate AI variation', async ({ page }) => {

    await page.goto('http://localhost:3000/');
    await page.click('button:has-text("Login")');
    await page.fill('input[name="username"]', 'SandaGeorgiana2002');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/about');


    await page.click('a[href="/ai_art"]');
    await page.waitForURL('**/ai_art');
    await expect(page.locator('#pageTitle')).toHaveText(/AI Art page/i);

    const testImagePath = path.resolve(__dirname, 'assets/trandafir.jpg'); // ai nevoie de un fișier aici
    const fileInput = page.locator('input#imageUpload');
    await fileInput.setInputFiles(testImagePath);


    const generateBtn = page.locator('#generateFromUpload');
    await expect(generateBtn).toBeVisible();
    await generateBtn.click();


    const resultImg = page.locator('#generatedResult img');
    await expect(resultImg).toBeVisible({ timeout: 150000 });


    await resultImg.evaluate(async (img) => {
        if (img.complete) return true;
        await new Promise((resolve, reject) => {
            img.onload = () => resolve(true);
            img.onerror = () => reject(new Error('Imaginea generată nu s-a încărcat.'));
        });
    });

    const width = await resultImg.evaluate(img => img.naturalWidth);
    expect(width).toBeGreaterThan(0);

    const src = await resultImg.getAttribute('src');
    expect(src).toMatch(/^https?:\/\//);


    await resultImg.screenshot({ path: 'ai-art-upload-result.png' });

    await page.waitForTimeout(2000);
});
