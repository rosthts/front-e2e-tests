import { Locator, Page } from "@playwright/test";

export class LoginPage {
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly submitButton: Locator;
    public readonly emailError: Locator;
    public readonly passwordError: Locator;
    public readonly heading: Locator;

    constructor(private readonly page: Page) {
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
        this.emailError = page.getByText('Email is required');
        this.passwordError = page.getByText('Password is required');
        this.heading = page.getByRole('heading', { name: 'Login' });
    }

    async open() {
        await this.page.goto('/');
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.submitButton.click();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submit();
    }
}