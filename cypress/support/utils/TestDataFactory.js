/**
 * Test Data Factory for generating test data
 */
class TestDataFactory {
  /**
   * Get test data for products API tests
   * @returns {Object} Test data object
   */
  static getProductsTestData() {
    return {
      searchTerms: {
        valid: ['top', 'dress', 'shirt', 'jeans'],
        invalid: ['xyz123', 'nonexistent'],
        empty: ''
      },
      expectedFields: [
        'id',
        'name', 
        'price',
        'brand',
        'category'
      ]
    };
  }

  /**
   * Get test data for brands API tests
   * @returns {Object} Test data object
   */
  static getBrandsTestData() {
    return {
      expectedFields: [
        'id',
        'brand'
      ],
      expectedBrands: [
        'Polo',
        'H&M',
        'Madame',
        'Mast & Harbour',
        'Babyhug',
        'Allen Solly Junior',
        'Kookie Kids',
        'Biba'
      ]
    };
  }

  /**
   * Get test data for user account tests
   * @returns {Object} Test data object
   */
  static getUserTestData() {
    const timestamp = Date.now();
    return {
      validUser: {
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
      },
      invalidUser: {
        email: 'invalid-email',
        password: ''
      },
      existingUser: {
        email: 'existing@example.com',
        password: 'password123'
      }
    };
  }

  /**
   * Get expected response codes
   * @returns {Object} Response codes object
   */
  static getResponseCodes() {
    return {
      success: 200,
      created: 201,
      badRequest: 400,
      unauthorized: 401,
      notFound: 404,
      methodNotAllowed: 405,
      internalServerError: 500
    };
  }

  /**
   * Get expected error messages
   * @returns {Object} Error messages object
   */
  static getErrorMessages() {
    return {
      invalidMethod: 'This request method is not supported.',
      userExists: 'Account already exists with this email, try other email!',
      userNotFound: 'User not found!',
      invalidCredentials: 'Invalid credentials!',
      missingParameter: 'Bad request, missing parameter.',
      invalidEmail: 'Invalid email format!'
    };
  }
}

export default TestDataFactory;
