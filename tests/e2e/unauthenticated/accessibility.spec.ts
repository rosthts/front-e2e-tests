import { expect, test } from "../../fixtures";
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
    test('login page has no accessibility violations',{tag: ['@a11y', '@regression']}, async ({ loginPage }) => {
        const results = await new AxeBuilder({ page: loginPage.currentPage }).analyze();
        expect(results.violations).toEqual([]);
    });

    test('login page with errors has no violations',{tag: ['@a11y', '@regression']}, async ({ loginPage }) => {
        await loginPage.submit();
        const results = await new AxeBuilder({ page: loginPage.currentPage }).analyze();
        expect(results.violations).toEqual([]);
    });
});