const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Inventory Catalog & Cart Tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html/);
  });

  test('should add items to cart and update badge count', async () => {
    // Initial badge count should be 0
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);

    // Add backpack
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    // Add bike light
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
  });

  test('should remove items from cart and update badge count', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    await inventoryPage.removeItemFromCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('should sort products by price (low to high)', async () => {
    await inventoryPage.selectSortOption('lohi');
    const prices = await inventoryPage.getItemPrices();
    
    // Create a copy and sort mathematically low to high
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('should sort products by price (high to low)', async () => {
    await inventoryPage.selectSortOption('hilo');
    const prices = await inventoryPage.getItemPrices();
    
    // Create a copy and sort mathematically high to low
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test('should sort products by name (A to Z)', async () => {
    await inventoryPage.selectSortOption('az');
    const names = await inventoryPage.getItemNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test('should sort products by name (Z to A)', async () => {
    await inventoryPage.selectSortOption('za');
    const names = await inventoryPage.getItemNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });
});
