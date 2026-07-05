/**
 * Page Object Model for the SauceDemo Checkout Pages (Step 1, Step 2, and Complete)
 */
class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Step 1: Your Information
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step 2: Overview
    this.summaryItemName = page.locator('[data-test="inventory-item-name"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    // Complete: Success Page
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Fill out the personal information form and proceed
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   */
  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Get error message text on checkout info page
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Get names of items displayed in the checkout summary
   * @returns {Promise<string[]>}
   */
  async getSummaryItemNames() {
    return await this.summaryItemName.allTextContents();
  }

  /**
   * Get the item subtotal, tax, and total values
   * @returns {Promise<{subtotal: number, tax: number, total: number}>}
   */
  async getCheckoutSummaryTotals() {
    const subtotalText = await this.subtotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    // Parse values e.g. "Item total: $29.99" -> 29.99
    const subtotal = parseFloat(subtotalText.replace(/[^\d.]/g, ''));
    const tax = parseFloat(taxText.replace(/[^\d.]/g, ''));
    const total = parseFloat(totalText.replace(/[^\d.]/g, ''));

    return { subtotal, tax, total };
  }

  /**
   * Click the finish button to place the order
   */
  async clickFinish() {
    await this.finishButton.click();
  }

  /**
   * Get the success header text (e.g. "Thank you for your order!")
   * @returns {Promise<string>}
   */
  async getSuccessMessage() {
    return await this.completeHeader.textContent();
  }

  /**
   * Go back to products from the success screen
   */
  async clickBackHome() {
    await this.backHomeButton.click();
  }
}

module.exports = { CheckoutPage };
