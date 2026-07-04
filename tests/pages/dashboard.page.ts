import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage {
    public readonly heading: Locator;
    public readonly welcomeMessage: Locator;
    public readonly logoutButton: Locator;
    public readonly counter: Locator;
    public readonly incrementButton: Locator;
    public readonly resetButton: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.getByRole('heading', { name: 'Dashboard' });
        this.welcomeMessage = page.getByText('Welcome back');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.counter = page.getByTestId('counter-value');
        this.incrementButton = page.getByTestId('increment-button');
        this.resetButton = page.getByTestId('reset-button');
    }

    async open() {
        throw new Error('DashboardPage has no direct URL — login first');
    }

    async logout() {
        await this.logoutButton.click();
    }
}
