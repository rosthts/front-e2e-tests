import { expect, test } from '@playwright/test'

test('Login page is displayed', async({page}) =>{
    await page.goto('http://localhost:5173');

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page. getByLabel('Email')).toBeVisible();
    await expect(page. getByLabel('Password')).toBeVisible();
    await expect(page. getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('Login with empty fields (negative test)', async({page}) =>{
    await page.goto('http://localhost:5173');

    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
});

test('Login (positive test)', async({page}) =>{
    await page.goto('http://localhost:5173');
    await page.getByLabel('Email').fill('test@gmail.com')
    await page.getByLabel('Password').fill('Password')
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Login successful')).toBeVisible();


})