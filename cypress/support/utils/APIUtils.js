/**
 * API Utility class for common API testing operations
 */
class APIUtils {
  /**
   * Validate response status code
   * @param {Cypress.Response} response - Cypress response object
   * @param {number} expectedStatus - Expected status code
   */
  static validateStatusCode(response, expectedStatus) {
    expect(response.status).to.eq(expectedStatus);
  }

  /**
   * Validate response contains specific property
   * @param {Cypress.Response} response - Cypress response object
   * @param {string} property - Property name to check
   */
  static validateResponseProperty(response, property) {
    expect(response.body).to.have.property(property);
  }

  /**
   * Validate response body is an array
   * @param {Cypress.Response} response - Cypress response object
   */
  static validateResponseIsArray(response) {
    expect(response.body).to.be.an('array');
  }

  /**
   * Validate response body is an object
   * @param {Cypress.Response} response - Cypress response object
   */
  static validateResponseIsObject(response) {
    expect(response.body).to.be.an('object');
  }

  /**
   * Validate response time is within acceptable range
   * @param {Cypress.Response} response - Cypress response object
   * @param {number} maxTime - Maximum acceptable response time in ms
   */
  static validateResponseTime(response, maxTime = 5000) {
    expect(response.duration).to.be.lessThan(maxTime);
  }

  /**
   * Validate response headers contain specific header
   * @param {Cypress.Response} response - Cypress response object
   * @param {string} headerName - Header name to check
   */
  static validateResponseHeader(response, headerName) {
    expect(response.headers).to.have.property(headerName.toLowerCase());
  }

  /**
   * Validate response body contains specific text
   * @param {Cypress.Response} response - Cypress response object
   * @param {string} text - Text to search for
   */
  static validateResponseContainsText(response, text) {
    const responseText = typeof response.body === 'string' 
      ? response.body 
      : JSON.stringify(response.body);
    expect(responseText).to.include(text);
  }

  /**
   * Validate response body structure for products list
   * @param {Cypress.Response} response - Cypress response object
   */
  static validateProductsListStructure(response) {
    expect(response.body).to.have.property('responseCode');
    expect(response.body).to.have.property('products');
    
    if (response.body.products && response.body.products.length > 0) {
      const firstProduct = response.body.products[0];
      expect(firstProduct).to.have.property('id');
      expect(firstProduct).to.have.property('name');
      expect(firstProduct).to.have.property('price');
      expect(firstProduct).to.have.property('brand');
      expect(firstProduct).to.have.property('category');
    }
  }

  /**
   * Validate response body structure for brands list
   * @param {Cypress.Response} response - Cypress response object
   */
  static validateBrandsListStructure(response) {
    expect(response.body).to.have.property('responseCode');
    expect(response.body).to.have.property('brands');
    
    if (response.body.brands && response.body.brands.length > 0) {
      const firstBrand = response.body.brands[0];
      expect(firstBrand).to.have.property('id');
      expect(firstBrand).to.have.property('brand');
    }
  }

  /**
   * Log response details for debugging
   * @param {Cypress.Response} response - Cypress response object
   * @param {string} testName - Name of the test for logging
   */
  static logResponseDetails(response, testName) {
    cy.log(`${testName} - Status: ${response.status}`);
    cy.log(`${testName} - Duration: ${response.duration}ms`);
    cy.log(`${testName} - Body:`, response.body);
  }

  /**
   * Generate test data for user creation
   * @returns {Object} User data object
   */
  static generateUserData() {
    const timestamp = Date.now();
    return {
      name: `Test User ${timestamp}`,
      email: `testuser${timestamp}@example.com`,
      password: 'testpassword123',
      title: 'Mr',
      birth_date: '1',
      birth_month: '1',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'Test Company',
      address1: '123 Test Street',
      address2: 'Apt 1',
      country: 'United States',
      zipcode: '12345',
      state: 'Test State',
      city: 'Test City',
      mobile_number: '1234567890'
    };
  }

  /**
   * Validate common error response structure
   * @param {Cypress.Response} response - Cypress response object
   * @param {number} expectedCode - Expected response code
   * @param {string} expectedMessage - Expected error message
   */
  static validateErrorResponse(response, expectedCode, expectedMessage) {
    expect(response.body).to.have.property('responseCode', expectedCode);
    expect(response.body).to.have.property('message', expectedMessage);
  }
}

export default APIUtils;
