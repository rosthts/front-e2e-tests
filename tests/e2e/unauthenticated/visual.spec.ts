import { expect, test } from "../../fixtures";

test.describe('Visual regression', () => {
    test('login page',{tag: ['@visual', '@regression']}, async ({ loginPage }) => {
        await expect(loginPage.currentPage).toHaveScreenshot('login-page.png');
    });

    test('login page with validation errors matches screenshot',{tag: ['@visual', '@regression']}, async ({ loginPage }) => {
        await loginPage.submit();
        await expect(loginPage.currentPage).toHaveScreenshot('login-page-with-validation-errors.png');
    });
})