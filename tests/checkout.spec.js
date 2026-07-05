const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Checkout Workflow Tests', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html/);
  });

  test('should complete end-to-end checkout with multiple items successfully', async () => {
    const item1 = 'Sauce Labs Backpack';
    const item2 = 'Sauce Labs Bolt T-Shirt';

    // 1. Add items to cart and navigate to Cart
    await inventoryPage.addItemToCart(item1);
    await inventoryPage.addItemToCart(item2);
    await inventoryPage.goToCart();

    // 2. Verify items on Cart page
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(item1);
    expect(cartItems).toContain(item2);

    // 3. Proceed to Checkout Info
    await cartPage.clickCheckout();

    // 4. Fill customer details
    await checkoutPage.fillInformation('Alex', 'Tester', '90210');

    // 5. Verify Checkout Overview items
    const summaryItems = await checkoutPage.getSummaryItemNames();
    expect(summaryItems).toContain(item1);
    expect(summaryItems).toContain(item2);

    // 6. Verify Checkout Calculations (subtotal should equal sum of items)
    // Backpack is $29.99, Bolt T-Shirt is $15.99 -> subtotal = $45.98
    const { subtotal, tax, total } = await checkoutPage.getCheckoutSummaryTotals();
    expect(subtotal).toBe(45.98);
    expect(tax).toBeCloseTo(3.68, 2); // 8% tax rate approximation
    expect(total).toBeCloseTo(49.66, 2);

    // 7. Finish Checkout
    await checkoutPage.clickFinish();

    // 8. Verify Success Screen
    const successMsg = await checkoutPage.getSuccessMessage();
    expect(successMsg).toContain('Thank you for your order!');
  });

  test('should block proceeding in checkout step 1 if information is missing', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();

    // Try leaving last name empty
    await checkoutPage.fillInformation('Alex', '', '90210');
    let errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Error: Last Name is required');

    // Try leaving first name empty
    await checkoutPage.firstNameInput.fill('');
    await checkoutPage.lastNameInput.fill('Tester');
    await checkoutPage.continueButton.click();
    errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Error: First Name is required');
  });
});
