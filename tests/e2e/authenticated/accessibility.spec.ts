import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../fixtures";


test.describe('Accessibility', {tag: ['@a11y', '@regression']}, () => {
    test('dashboard page has no accessibility violations', async ({ dashboardPage }) => {
        const results = await new AxeBuilder({ page: dashboardPage.currentPage }).analyze();
        expect(results.violations).toEqual([]);
    });
});