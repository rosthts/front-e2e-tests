import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly submitButton: Locator;
    public readonly emailError: Locator;
    public readonly passwordError: Locator;
    public readonly heading: Locator;
    public readonly authError: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.submitButton = page.getByTestId('submit-button');
        this.emailError = page.getByTestId('email-error');
        this.passwordError = page.getByTestId('password-error');
        this.heading = page.getByRole('heading', { name: 'Login' });
        this.authError = page.getByTestId('auth-error');
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
