import { expect, test as setup } from '../../fixtures';

setup('authenticate', async ({ loginPage, credentials, page, dashboardPage }) => {
  await loginPage.login(credentials.email, credentials.password);
  await expect(dashboardPage.heading).toBeVisible();
  await page.context().storageState({ path: 'tests/.auth/user.json' });
});