/**
 * Page Object Model for Automation Exercise API
 * Contains all API endpoints and methods for automation exercise website
 */
class AutomationExerciseAPI {
  constructor() {
    this.baseUrl = 'https://automationexercise.com/api';
    this.endpoints = {
      productsList: '/productsList',
      brandsList: '/brandsList',
      searchProduct: '/searchProduct',
      verifyLogin: '/verifyLogin',
      createAccount: '/createAccount',
      deleteAccount: '/deleteAccount',
      updateAccount: '/updateAccount',
      getUserDetailByEmail: '/getUserDetailByEmail'
    };
  }

  /**
   * Get all products list
   * @returns {Cypress.Chainable} Cypress request response
   */
  getAllProducts() {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoints.productsList}`,
      failOnStatusCode: false
    });
  }

  /**
   * Get all brands list
   * @returns {Cypress.Chainable} Cypress request response
   */
  getAllBrands() {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoints.brandsList}`,
      failOnStatusCode: false
    });
  }

  /**
   * Search for products
   * @param {string} searchProduct - Product name to search
   * @returns {Cypress.Chainable} Cypress request response
   */
  searchProduct(searchProduct) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${this.endpoints.searchProduct}`,
      form: true,
      body: {
        search_product: searchProduct
      },
      failOnStatusCode: false
    });
  }

  /**
   * Verify user login
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Cypress.Chainable} Cypress request response
   */
  verifyLogin(email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${this.endpoints.verifyLogin}`,
      form: true,
      body: {
        email: email,
        password: password
      },
      failOnStatusCode: false
    });
  }

  /**
   * Create user account
   * @param {Object} userData - User data object
   * @returns {Cypress.Chainable} Cypress request response
   */
  createAccount(userData) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${this.endpoints.createAccount}`,
      form: true,
      body: userData,
      failOnStatusCode: false
    });
  }

  /**
   * Delete user account
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Cypress.Chainable} Cypress request response
   */
  deleteAccount(email, password) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}${this.endpoints.deleteAccount}`,
      form: true,
      body: {
        email: email,
        password: password
      },
      failOnStatusCode: false
    });
  }

  /**
   * Update user account
   * @param {Object} userData - User data to update
   * @returns {Cypress.Chainable} Cypress request response
   */
  updateAccount(userData) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}${this.endpoints.updateAccount}`,
      form: true,
      body: userData,
      failOnStatusCode: false
    });
  }

  /**
   * Get user details by email
   * @param {string} email - User email
   * @returns {Cypress.Chainable} Cypress request response
   */
  getUserDetailByEmail(email) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoints.getUserDetailByEmail}`,
      qs: {
        email: email
      },
      failOnStatusCode: false
    });
  }
}

export default AutomationExerciseAPI;
