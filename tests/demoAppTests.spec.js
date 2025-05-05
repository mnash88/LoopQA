import { test, expect } from '@playwright/test';

//test data
const url = 'https://animated-gingersnap-8cf7f2.netlify.app/';
const user = 'admin';
const pass = 'password123';

const testData = [
  { testNumber: '1', project: 'Web Application', column: 'To Do', columnNumber: '0', card: 'Implement user authentication', task: 'Add login and signup functionality', tags: ['Feature', 'High Priority']},
  { testNumber: '2', project: 'Web Application', column: 'To Do', columnNumber: '0', card: 'Fix navigation bug', task: 'Menu does not close on mobile', tags: ['Bug']}
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

async function verifyCard(page, column, columnNumber, card, task, tags){
  const header = page.locator('h2', { hasText: column });
  const subHeader = page.locator('h3', { hasText: card});
  const paragraph = page.locator('p', { hasText: task });
  
  await Promise.all([
    expect(header).toBeVisible(),
    expect(subHeader).toBeVisible(),
    expect(paragraph).toBeVisible(),
    confirmTags(page, columnNumber, tags),
  ]);
};

async function confirmTags(page, columnNumber, tags){
  for (const tagText of tags) {
    const span = page.locator('span', { hasText: tagText }).nth(columnNumber);
    await expect(span).toBeVisible();
  }
};


//tests for loop
for (const data of testData) {
  test(`Test Case ${data.testNumber}`, async ({ page }) => {
    await login(page, user, pass);
    await navigate(page, data.project);
    await verifyCard(page, data.column, data.columnNumber, data.card, data.task, data.tags);
  });
}
