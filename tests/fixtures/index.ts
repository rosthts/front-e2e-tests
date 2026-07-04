import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { createUser, UserCredentials } from "../factories/user.factory";

type Fixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    credentials: UserCredentials;
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },

    dashboardPage: async ({ page }, use) => {
        await page.goto('/');
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    //eslint-disable-next-line no-empty-pattern
    credentials: async ({}, use) => {
        await use(createUser());
    },
});

export { expect } from '@playwright/test'