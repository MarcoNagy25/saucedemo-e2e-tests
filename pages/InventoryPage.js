/**
 * Page Object Model for the SauceDemo Inventory (Products) Page
 */
class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.itemTitle = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Add a product to the cart by its name
   * @param {string} name
   */
  async addItemToCart(name) {
    const itemContainer = this.inventoryItem.filter({ hasText: name });
    const addButton = itemContainer.locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  /**
   * Remove a product from the cart by its name
   * @param {string} name
   */
  async removeItemFromCart(name) {
    const itemContainer = this.inventoryItem.filter({ hasText: name });
    const removeButton = itemContainer.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  /**
   * Get the number of items shown on the cart badge
   * @returns {Promise<number>}
   */
  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }

  /**
   * Click on the shopping cart icon to navigate to the cart page
   */
  async goToCart() {
    await this.cartButton.click();
  }

  /**
   * Select a sorting option in the dropdown
   * @param {'az' | 'za' | 'lohi' | 'hilo'} value
   */
  async selectSortOption(value) {
    await this.sortDropdown.selectOption(value);
  }

  /**
   * Get all inventory item names in order
   * @returns {Promise<string[]>}
   */
  async getItemNames() {
    return await this.itemTitle.allTextContents();
  }

  /**
   * Get all inventory item prices in order as numbers
   * @returns {Promise<number[]>}
   */
  async getItemPrices() {
    const priceStrings = await this.itemPrice.allTextContents();
    return priceStrings.map(price => parseFloat(price.replace('$', '')));
  }
}

module.exports = { InventoryPage };
