/**
 * Page Object Model for the SauceDemo Login Page
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Perform login action
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    if (username !== undefined) {
      await this.usernameInput.fill(username);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }

  /**
   * Get the error message text if visible
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
