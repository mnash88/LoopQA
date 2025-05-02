import { test, expect } from '@playwright/test';

//test data
const url = 'https://animated-gingersnap-8cf7f2.netlify.app/';
const user = 'admin';
const pass = 'password123';

const testData = [
  { project: 'Web Application', column: 'To Do', card: 'Implement user authentication', tags: ['Feature', 'High Priority']}
];

//helper functions
async function login(page, username, password) {
  await page.goto(url);
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
};

async function navigate(page, tab){
  await page.click(`text=${tab}`);
};

async function verify(page, column, card){
  const header = page.locator('h2', { hasText: column });
  const subHeader = page.locator('h3', { hasText: card});
  await expect(header).toBeVisible();
  await expect(subHeader).toBeVisible();
};

async function confirm(page, tags){
  for (const text of tags) {
    const span = page.locator('span', { hasText: text});
    await expect(span).toBeVisible();
  }
};


//tests for loop
for (const data of testData) {
  test(`Test Case ${data.project}`, async ({ page }) => {
    await login(page, user, pass);
    await navigate(page, data.project);
    await verify(page, data.column, data.card);
    await confirm(page, data.tags);
  });
}
