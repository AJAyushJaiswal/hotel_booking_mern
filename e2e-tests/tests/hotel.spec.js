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


test('should allow user to update hotel', async({page}) => {
    await page.getByRole('link', {name: 'My Hotels'}).click();
    
    await expect(page.getByRole('heading', {name: 'My Hotels'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Add Hotel'})).toBeVisible();
    
    await expect(page.getByRole('heading', {name: 'Test Hotel', exact: true}).nth(0)).toBeVisible();
    
    await page.locator('div > a', {has: page.locator('svg')}).nth(6).click();
    

    await expect(page.getByRole('heading', {name: 'Edit Hotel'})).toBeVisible();
    
    await page.waitForSelector('[name="name"]', {state: "attached"});
    await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel');
    
    await page.waitForSelector('[name="address"]', {state: "attached"});
    await expect(page.locator('[name="address"]')).toHaveValue('testpur, 34029');
    
    await page.waitForSelector('select[name="city"]', {state: "attached"});
    await expect(page.locator('select[name="city"]')).toHaveValue('Hyderabad');
    
    await page.waitForSelector('select[name="country"]', {state: "attached"});
    await expect(page.locator('select[name="country"]')).toHaveValue('India');
    
    await page.waitForSelector('[name="description"]', {stage: "attached"});
    await expect(page.locator('[name="description"]')).toHaveValue('Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test');
    
    await page.waitForSelector('select[name="starRating"]', {stage: "attached"});
    await expect(page.locator('select[name="starRating"]')).toHaveValue('3');

    await page.waitForSelector('text=Resort', {stage: "attached"});
    await expect(page.locator('input[type="radio"][value="Resort"]', {exact: true})).toBeChecked();
    
    await page.waitForSelector('input[type="checkbox"][value="Wi-Fi"]', {stage: "attached"});
    await expect(page.locator('input[type="checkbox"][value="Wi-Fi"]')).toBeChecked();

    await page.waitForSelector('input[type="checkbox"][value="Parking"]', {stage: "attached"});
    await expect(page.locator('input[type="checkbox"][value="Parking"]')).toBeChecked();

    await page.waitForSelector('input[type="checkbox"][value="Sauna"]', {stage: "attached"});
    await expect(page.locator('input[type="checkbox"][value="Sauna"]')).toBeChecked();
    
    await page.waitForSelector('img[alt="Hotel Image 0"]', {stage: "attached"});
    await expect(page.locator('img[alt="Hotel Image 0"]')).toBeVisible();

    await page.waitForSelector('img[alt="Hotel Image 1"]', {stage: "attached"});
    await expect(page.locator('img[alt="Hotel Image 1"]')).toBeVisible();

    await page.waitForSelector('img[alt="Hotel Image 2"]', {stage: "attached"});
    await expect(page.locator('img[alt="Hotel Image 2"]')).toBeVisible();

    
    await page.locator('[name=name]').fill('Test Hotel 2');
    await page.locator('[name=address]').fill('testpur 22'); 
    await page.selectOption('select[name="city"]', 'Delhi'); 
    await page.selectOption('select[name="starRating"]', 'No Star Rating');
    await page.locator('[name=email]').fill('testhotel2@gmail.com');
    await page.getByText('Budget').click();
    await page.getByLabel('Wi-Fi').uncheck();
    await page.getByLabel('Parking').uncheck();
    await page.getByLabel('Sauna').uncheck();
    
    await page.locator('div.relative > button', {has: page.locator('svg')}).nth(2).click();
    await page.locator('div.relative > button', {has: page.locator('svg')}).nth(1).click();
    await page.locator('div.relative > button', {has: page.locator('svg')}).nth(0).click();
    
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, '/files/images/hotels', 'hotel_1_1.jpg')
    ]);
    
    await page.getByRole('button', {name: 'Save'}).click();
    
    await expect(page.getByRole('button', {name: 'Saving ...'})).toBeDisabled();
    await expect(page.getByRole('button', {name: 'Saving ...'})).toBeVisible();
    
    await expect(page.getByText('Hotel updated successfully!')).toBeVisible({timeout: 15000});
})