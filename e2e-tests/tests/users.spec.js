import {test, expect} from '@playwright/test';


const UI_URL = 'http://localhost:5173';


test('should allow user to register', async ({page}) => {
  const testEmail = `testemail${Math.floor(Math.random() * 10000)}@email.com`;  

  await page.goto(UI_URL);
  
  await page.getByRole('link', {name: 'Register'}).click();
  
  await expect(page.getByRole('heading', {name: 'Create an account'})).toBeVisible();
  
  await page.locator("[name=firstName]").fill('First');
  await page.locator("[name=lastName]").fill('Last');
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill('Test@1234');
  await page.locator("[name=confirmPassword]").fill('Test@1234');
  
  await page.getByRole('button', {name: 'Create Account'}).click();
  
  await expect(page.getByText('User registered successfully!')).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Profile'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
});


test('should allow user to log in', async ({page}) => {
  await page.goto(UI_URL);

  await page.getByRole('link', {name: 'Login'}).click();
  
  await expect(page.getByRole('heading', {name: 'Login to your account'})).toBeVisible();
  
  await page.locator('[name=email]').fill('testemail397@email.com');
  await page.locator('[name=password]').fill('Test@1234');
  
  await page.getByRole('button', {name: 'Login'}).click();
  
  await expect(page.getByText('User logged in successfully!')).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Profile'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
});


test('should allow user to logout', async ({page}) =>{
  await page.goto(UI_URL);
  
  await page.getByRole('link', {name: 'Login'}).click();
  
  await expect(page.getByRole('heading', {name: 'Login to your account'})).toBeVisible();
  
  await page.locator('[name=email]').fill('testemail397@email.com');
  await page.locator('[name=password]').fill('Test@1234');
  
  await page.getByRole('button', {name: 'Login'}).click();
  
  await expect(page.getByText('User logged in successfully!')).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
  
  await page.getByRole('button', {name: 'Logout'}).click();
  
  await expect(page.getByText('User logged out successfully!')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Hotels'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Offers'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Testimonials'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Contact Us'})).toBeVisible();
});