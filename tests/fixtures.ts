import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { DashboardPage } from "./pages/dashboard.page";

type Fixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    credentials: {
        email: string;
        password: string;
    }
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, provide) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await provide(loginPage);
    },

    dashboardPage: async ({ page }, provide) => {
        const dashboardPage = new DashboardPage(page);
        await provide(dashboardPage);
    },

    // eslint-disable-next-line no-empty-pattern
    credentials: async ({}, provide) => {
        await provide({
            email: 'test@example.com',
            password: 'password',
        });
    },
});

export { expect } from '@playwright/test'