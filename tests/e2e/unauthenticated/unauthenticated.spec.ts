import { expect, test } from '../../fixtures';
import { INVALID_CREDENTIALS_CASES } from '../../factories/user.factory';

test.describe('Login page', {tag: ['@smoke', '@regression']}, () => {
    test('all elements are visible', async({ loginPage }) =>{
        await expect(loginPage.heading).toBeVisible();
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.submitButton).toBeVisible();
    });

    test('shows validation errors on empty submit',{tag: ['@smoke', '@regression']}, async({ loginPage }) =>{
        await loginPage.submit();
        await expect(loginPage.emailError).toBeVisible()
        await expect(loginPage.emailError).toHaveText('Email is required');
        await expect(loginPage.passwordError).toBeVisible();
        await expect(loginPage.passwordError).toHaveText('Password is required');
    });
})

test.describe('Successful login', () => {
    test('Login with correct data',{tag: ['@smoke', '@regression']}, async({ loginPage, credentials, dashboardPage }) =>{

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

    test('User can reach dashboard after fixing validation errors',{tag: '@regression'}, async({ loginPage, dashboardPage, credentials }) =>{
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

    test('User can see loading state when submitting form',{tag: '@regression'}, async({ loginPage, credentials, dashboardPage }) =>{
        await test.step('Fill email and password', async() =>{
            await loginPage.fillEmail(credentials.email);
            await loginPage.fillPassword(credentials.password);
        });
        await test.step('Submit form', async() =>{
            await loginPage.submit()
        
            await expect(loginPage.submitButton).toHaveText('Signing in...');
            await expect(loginPage.submitButton).toBeDisabled();
    });
    
        await test.step('Verify redirect to dashboard', async() =>{
            await expect(dashboardPage.heading).toBeVisible();
            await expect(dashboardPage.welcomeMessage).toBeVisible();
        });
    });
})

test.describe('Invalid credentials', () => {

    for (const { name, email, password } of INVALID_CREDENTIALS_CASES) {
        test(`shows auth error for ${name}`,{tag: '@regression'}, async ({ loginPage, dashboardPage }) => {
          await loginPage.login(email, password);
          await expect(loginPage.authError).toBeVisible();
          await expect(dashboardPage.heading).not.toBeVisible();
        });
      }
});









