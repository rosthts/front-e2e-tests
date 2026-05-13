
import { expect, test } from './fixtures';

test('Login page is displayed', async({ loginPage }) =>{
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
});

test('Login with empty fields (negative test)', async({ loginPage }) =>{
    await loginPage.submit();
    await expect(loginPage.emailError).toBeVisible()
    await expect(loginPage.passwordError).toBeVisible();
});

test('Login (positive test)', async({ loginPage, credentials, dashboardPage }) =>{

    await test.step('Fill email and password', async() =>{
        await loginPage.fillEmail(credentials.email);
        await loginPage.fillPassword(credentials.password);
    });
    await test.step('Submit form', async() =>{
        await loginPage.submit();
    });
    await test.step('Verify redirect to dashboard', async() =>{
        await expect(dashboardPage.heading).toBeVisible();
        await expect(dashboardPage.welcomeMessage).toBeVisible();
    });
})

test('User can reach dashboard after fixing validation errors', async({ loginPage, dashboardPage, credentials }) =>{
    await test.step('Login with empty fields', async() =>{
        await loginPage.submit();
        await expect(loginPage.emailError).toBeVisible()
        await expect(loginPage.passwordError).toBeVisible();
    });
    await test.step('Login with correct data', async() =>{
        await loginPage.login(credentials.email, credentials.password);
        await expect(dashboardPage.heading).toBeVisible();
        await expect(dashboardPage.welcomeMessage).toBeVisible();
    });
})