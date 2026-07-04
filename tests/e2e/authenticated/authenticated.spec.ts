import { expect, test } from '../../fixtures';

test.describe('Logout', {tag: ['@smoke', '@regression']}, () => {
    test('User can logout from dashboard', async({ dashboardPage, loginPage }) =>{
        await test.step('Logout from dashboard', async() =>{
            await dashboardPage.logout();
            await expect(loginPage.heading).toBeVisible();
            await expect(loginPage.emailInput).toBeVisible();
            await expect(loginPage.emailInput).toHaveValue('');
            await expect(loginPage.passwordInput).toBeVisible();
            await expect(loginPage.passwordInput).toHaveValue('');
            await expect(loginPage.submitButton).toBeVisible();
        });
    });
});









