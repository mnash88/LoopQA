import { test, expect } from '@playwright/test';

//test data
const url = 'https://animated-gingersnap-8cf7f2.netlify.app/';
const user = 'admin';
const pass = 'password123';

const testCases = [
  { testNumber: '1', project: 'Web Application', column: 'To Do', card: 'Implement user authentication', tags: ['Feature', 'High Priority']},
  { testNumber: '2', project: 'Web Application', column: 'To Do', card: 'Fix navigation bug', tags: ['Bug']},
  { testNumber: '3', project: 'Web Application', column: 'In Progress', card: 'Design system updates', tags: ['Design']},
  { testNumber: '4', project: 'Mobile Application', column: 'To Do', card: 'Push notification system', tags: ['Feature']},
  { testNumber: '5', project: 'Mobile Application', column: 'In Progress', card: 'Offline mode', tags: ['Feature', 'High Priority']},
  { testNumber: '6', project: 'Mobile Application', column: 'Done', card: 'App icon design', tags: ['Design']},
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

async function verifyCard(page, column, card, tags){
  const header = page.locator('h2', { hasText: column });
  const subHeader = page.locator('h3', { hasText: card});

  await Promise.all([
    expect(header).toBeVisible(),
    expect(subHeader).toBeVisible(),
    confirmTags(page, tags),
  ]);
};

async function confirmTags(page, tags){
  for (const tagText of tags) {
    const span = page.locator('span', { hasText: tagText }).first();
    await expect(span).toBeVisible();
  }
};

//tests for loop
for (const data of testCases) {
  test(`Test Case ${data.testNumber}`, async ({ page }) => {
    await login(page, user, pass);
    await navigate(page, data.project);
    await verifyCard(page, data.column, data.card, data.tags);
  });
}
