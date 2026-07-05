/**
 * Page Object Model for the SauceDemo Cart Page
 */
class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItem = page.locator('[data-test="inventory-item"]');
    this.itemTitle = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Get names of all items currently in the cart
   * @returns {Promise<string[]>}
   */
  async getCartItemNames() {
    return await this.itemTitle.allTextContents();
  }

  /**
   * Click on the checkout button to proceed to checkout
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Remove a specific item from the cart page
   * @param {string} name
   */
  async removeItem(name) {
    const itemContainer = this.cartItem.filter({ hasText: name });
    const removeButton = itemContainer.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { CartPage };
