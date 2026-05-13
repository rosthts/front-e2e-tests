import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    public readonly heading: Locator;
    public readonly welcomeMessage: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'Dashboard' });
        this.welcomeMessage = page.getByText('Welcome back');
    }
}