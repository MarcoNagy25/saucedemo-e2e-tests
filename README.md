# Swag Labs (SauceDemo) E2E Test Automation Portfolio

[![Playwright Tests](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions/workflows/playwright.yml/badge.svg)](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions)
[![Playwright Version](https://img.shields.io/badge/Playwright-v1.45+-2ead33?logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This repository showcases a professional, production-ready **End-to-End (E2E) Test Automation Framework** targeting the [SauceDemo (Swag Labs)](https://www.saucedemo.com/) website. 

It is designed to demonstrate industry-standard QA engineering principles: **clean page object modeling (POM)**, robust assertions, multi-browser validation, and seamless **CI/CD integration** via GitHub Actions.

---

## 🚀 Key Features

*   **Page Object Model (POM) Architecture:** Clean separation between test scripts and UI locators/interactions for high maintainability.
*   **Multi-Browser Execution:** Pre-configured to execute tests across **Chromium** (Chrome/Edge), **Firefox**, and **WebKit** (Safari).
*   **Parallel Execution:** Configured to run tests concurrently, drastically decreasing suite execution time.
*   **Rich Test Reporting:** Automatically generates interactive HTML reports, captures page screenshots on failure, and compiles traces for step-by-step debugging.
*   **CI/CD Pipeline:** Fully configured GitHub Actions workflow that executes the test suite on every commit/pull request and archives Playwright HTML reports.

---

## 📁 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI/CD configuration
├── pages/                         # Page Object Model (POM) layer
│   ├── LoginPage.js               # Page object for Login interactions
│   ├── InventoryPage.js           # Page object for the Product Catalog
│   ├── CartPage.js                # Page object for the Shopping Cart
│   └── CheckoutPage.js            # Page object for the checkout steps
├── tests/                         # E2E Test Suite layer
│   ├── auth.spec.js               # Authentication validation tests
│   ├── inventory.spec.js          # Cart badges, removals & catalog sorting tests
│   └── checkout.spec.js           # Full E2E purchase & checkout calculations
├── package.json                   # Dependency setup and scripts
├── playwright.config.js           # Playwright framework configurations
└── README.md                      # Project documentation
```

---

## 🛠️ Local Setup & Execution

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 2. Clone and Install
First, install the project dependencies and Playwright browser binaries:
```bash
# Install Node dependencies
npm install

# Install Playwright browser binaries and dependencies
npx playwright install --with-deps
```

### 3. Run Tests
Execute the tests locally using the following scripts:

| Command | Action |
| :--- | :--- |
| `npm test` | Runs all tests headlessly in parallel on all 3 browsers. |
| `npm run test:ui` | Opens the **Playwright UI Runner** for interactive step-by-step visual debugging. |
| `npm run test:headed` | Runs tests on visible browser windows. |
| `npm run test:debug` | Runs tests in step-by-step inspector mode. |
| `npx playwright test tests/auth.spec.js` | Runs only a specific test file. |

### 4. Viewing Test Reports
After tests complete, an HTML report is compiled. Open it locally with:
```bash
npm run show-report
```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

Every time you push to this repository, a workflow is triggered on GitHub Actions. It:
1. Provisions an Ubuntu test runner environment.
2. Installs Node.js, dependencies, and headless browser binaries.
3. Executes the full test suite in parallel.
4. Generates and uploads the Playwright HTML test report as an workflow artifact (downloadable directly from the GitHub Actions dashboard).

---

## 💡 Best Practices Implemented

*   **Page Object Model (POM):** Prevents locator duplication and allows UI changes to be updated in a single place instead of modifying individual tests.
*   **Locators Strategy:** Uses high-stability `data-test` attributes (provided by SauceDemo) which resist page redesigns.
*   **Robust Assertions:** Utilizes Playwright’s auto-retrying `expect` assertions (e.g., `expect(page).toHaveURL()`), making tests highly resistant to page-load flakiness.
*   **Clean Test Hooks:** Implements clean `beforeEach` hooks to isolate test states and instantiate POM objects.
