import {test, expect} from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173';

test.beforeEach(async ({page}) => {
    await page.goto(UI_URL);
    
    await page.getByRole('link', {name: 'Login'}).click();
    await expect(page.getByRole('heading', {name: 'Login to your account'})).toBeVisible();

    await page.locator('[name=email]').fill('testemail397@email.com');
    await page.locator('[name=password]').fill('Test@1234');
    await page.getByRole('button', {name: 'Login'}).click();
    
    await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
})


test('should allow user to add a hotel', async ({page}) => {
    await page.getByRole('link', {name: 'My Hotels'}).click();
    await expect(page.getByRole('heading', {name: 'My Hotels'})).toBeVisible();

    // await page.getByRole('button', {name: 'Add Hotel', exact: false}).click();    
    await page.getByText('Add Hotel').click();    
    await expect(page.getByRole('Heading', {name: 'Add Hotel'})).toBeVisible();
    
    await page.locator('[name=name]').fill('Test Hotel');
    await page.locator('[name=address]').fill('testpur, 34029');
    await page.locator('[name=city]').selectOption('Hyderabad');
    await page.selectOption('select[name="country"]', 'India');
    await page.locator('[name=description]').fill('Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test ');
    await page.locator('[name=starRating]').selectOption('3');
    await page.locator('[name=contactNo]').fill('9199006010');
    await page.locator('[name=email]').fill('testemail397@gmail.com');
    await page.getByText('Resort', {exact: true}).click();
    await page.getByLabel('Wi-Fi').check();
    await page.getByLabel('Parking').check();
    await page.getByLabel('Sauna').check();
    await page.setInputFiles('[name=imageFiles]', [
        path.join(__dirname, 'files/images/hotels', 'hotel_1_1.jpg'),
        path.join(__dirname, 'files/images/hotels', 'hotel_1_2.jpg'),
        path.join(__dirname, 'files/images/hotels', 'hotel_1_3.jpg'),
    ]);

    await page.getByRole('button', {name: 'Save'}).click();
    
    await expect(page.getByRole('button', {name: 'Saving...'})).toBeDisabled();
    await expect(page.getByRole('button', {name: 'Saving...'})).toBeVisible();
    await expect(page.getByText('Hotel added successfully!')).toBeVisible({timeout: 15000});  // web-first assertions have timeout of 5000ms by default
});


test('should display all user hotels', async ({page}) => {
    await page.getByRole('link', {name: 'My Hotels'}).click();
    
    await expect(page.getByRole('heading', {name: 'My Hotels'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Add Hotel'})).toBeVisible();
});