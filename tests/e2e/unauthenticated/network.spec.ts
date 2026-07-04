import { expect, test } from "../../fixtures";

test.describe('Network error handling', () => {

    test('shows error when server returns 500',{tag: '@regression'}, async ({ loginPage, credentials }) => {
        await loginPage.currentPage.route('/api/login', async (route) => {
            await route.fulfill({
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Something went wrong' }),
            });
        });
        await loginPage.login(credentials.email, credentials.password);
        await expect(loginPage.authError).toBeVisible(); 
    });
});