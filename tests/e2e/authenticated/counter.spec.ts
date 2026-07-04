import { expect, test } from "../../fixtures";

test.describe('Counter', {tag: ['@smoke', '@regression']}, () => {
    test('start counter value is 0', async ({ dashboardPage }) => {
        await expect(dashboardPage.counter, 'Start counter value should be 0').toHaveText('0');
    });

    test('increment counter value by 1',{tag: ['@smoke', '@regression']}, async ({ dashboardPage }) => {
        await dashboardPage.incrementButton.click();
        await expect(dashboardPage.counter, 'Counter value should be 1').toHaveText('1');
    });

    test('increment counter value by 3',{tag:  '@regression'}, async ({ dashboardPage }) => {
        for (let i = 0; i < 3; i++) {
            await dashboardPage.incrementButton.click();
        }
        await expect(dashboardPage.counter, 'Counter value should be 3').toHaveText('3');
    });

    test('reset counter value to 0',{tag: ['@smoke', '@regression']}, async ({ dashboardPage }) => {
        await dashboardPage.incrementButton.click();
        await dashboardPage.resetButton.click();
        await expect(dashboardPage.counter, 'Counter value should be 0').toHaveText('0');
    });


});