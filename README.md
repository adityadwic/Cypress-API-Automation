# Cypress API Automation - Automation Exercise

🚀 **Professional API Testing with Cypress using Page Object Model (POM)**

This project demonstrates advanced API automation testing for the [Automation Exercise](https://automationexercise.com) website using Cypress with modern best practices including Page Object Model design pattern.

## 🎯 Overview

This repository contains comprehensive API automation tests that validate the Automation Exercise APIs using Cypress. The implementation follows industry standards with clean architecture, reusable components, and extensive test coverage.

### 🔗 APIs Tested

| API | Endpoint | Method | Description |
|-----|----------|--------|-------------|
| **API 1** | `/api/productsList` | GET | Get All Products List |
| **API 3** | `/api/brandsList` | GET | Get All Brands List |

## ✨ Features

- 🏗️ **Page Object Model (POM)** - Clean separation of test logic and API interactions
- 🛠️ **Utility Functions** - Reusable validation and helper methods
- 🎨 **Custom Commands** - Enhanced Cypress functionality for API testing
- 📊 **Comprehensive Testing** - Response validation, performance testing, error handling
- 🔄 **Integration Testing** - Cross-API data consistency validation
- 📝 **Test Data Management** - Centralized test data generation and management
- 🚀 **Performance Testing** - Response time validation and optimization
- 🛡️ **Error Handling** - Comprehensive error scenario testing

## 🏛️ Project Architecture

```
cypress/
├── e2e/
│   └── API-AutomationExerice/
│       ├── simple-api-tests.cy.js          ✅ Main working tests
│       ├── products-api.cy.js              📦 Products API tests
│       ├── brands-api.cy.js                🏷️ Brands API tests
│       └── complete-api-suite.cy.js        🔄 Integration tests
└── support/
    ├── pages/
    │   └── AutomationExerciseAPI.js        🏗️ Page Object Model
    ├── utils/
    │   ├── APIUtils.js                     🛠️ Utility functions
    │   └── TestDataFactory.js             📊 Test data management
    ├── commands.js                         🎯 Custom commands
    └── e2e.js                             ⚙️ Support configuration
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityadwic/Cypress-API-Automation.git
   cd Cypress-API-Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🧪 Running Tests

### Quick Test Execution

```bash
# Run all tests
npm test

# Run main working tests (recommended)
npm run test:simple

# Run specific API tests
npm run test:products      # Products API only
npm run test:brands        # Brands API only
npm run test:complete      # Complete test suite

# Run tests in headed mode
npm run test:headed

# Run tests in specific browsers
npm run test:chrome
npm run test:firefox
```

### Cypress Interactive Mode

```bash
# Open Cypress Test Runner
npm run test:open
```

## 📊 Test Results

The main test suite (`simple-api-tests.cy.js`) provides comprehensive coverage:

✅ **8 Passing Tests:**
1. Products API - GET request validation
2. Products API - POST method error handling  
3. Brands API - GET request validation
4. Brands API - Expected brands verification
5. Brands API - POST method error handling
6. Performance testing for both APIs
7. Data consistency between APIs
8. Error handling for invalid endpoints

## 🏗️ Page Object Model Implementation

### API Page Object (`AutomationExerciseAPI.js`)
```javascript
import AutomationExerciseAPI from '../../support/pages/AutomationExerciseAPI.js';

const apiPage = new AutomationExerciseAPI();

// Get all products
apiPage.getAllProducts().then((response) => {
  // Test logic here
});

// Get all brands
apiPage.getAllBrands().then((response) => {
  // Test logic here
});
```

### Utility Functions (`APIUtils.js`)
```javascript
import APIUtils from '../../support/utils/APIUtils.js';

// Validate status code
APIUtils.validateStatusCode(response, 200);

// Validate response structure
APIUtils.validateProductsListStructure(response);

// Log response details
APIUtils.logResponseDetails(response, 'Test Name');
```

### Custom Commands
```javascript
// Enhanced API request with logging
cy.apiRequest('GET', 'https://automationexercise.com/api/productsList');

// Validate API response
cy.validateApiResponse(response, 200);

// Automation Exercise specific API calls
cy.automationExerciseApi('/productsList');
```

## 🎯 Test Coverage

### API Validation
- ✅ Successful HTTP requests (GET)
- ✅ HTTP method validation (POST, PUT, DELETE not allowed)
- ✅ Response structure validation
- ✅ Data type validation
- ✅ Response code validation

### Performance Testing
- ✅ Response time validation (< 5 seconds)
- ✅ Concurrent request handling
- ✅ Load testing capabilities

### Error Handling
- ✅ Invalid HTTP methods
- ✅ Invalid endpoints
- ✅ Malformed requests
- ✅ Network error scenarios

### Integration Testing
- ✅ Cross-API data consistency
- ✅ Brand-Product relationship validation
- ✅ Data integrity checks

## 🛠️ Configuration

### Cypress Configuration (`cypress.config.js`)
```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    requestTimeout: 10000,
    responseTimeout: 10000,
    retries: { runMode: 2, openMode: 1 },
    env: { apiBaseUrl: 'https://automationexercise.com/api' }
  }
});
```

### Package Scripts (`package.json`)
```json
{
  "scripts": {
    "test": "cypress run",
    "test:simple": "cypress run --spec 'cypress/e2e/API-AutomationExerice/simple-api-tests.cy.js'",
    "test:products": "cypress run --spec 'cypress/e2e/API-AutomationExerice/products-api.cy.js'",
    "test:brands": "cypress run --spec 'cypress/e2e/API-AutomationExerice/brands-api.cy.js'",
    "test:open": "cypress open"
  }
}
```

## 📈 CI/CD Integration

This project is ready for CI/CD integration. Example GitHub Actions workflow:

```yaml
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with: { node-version: '16' }
      - run: npm install
      - run: npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Aditya Dwi Cahyono**
- GitHub: [@adityadwic](https://github.com/adityadwic)
- Repository: [Cypress-API-Automation](https://github.com/adityadwic/Cypress-API-Automation)

## 🔗 Related Links

- [Cypress Documentation](https://docs.cypress.io/)
- [Automation Exercise Website](https://automationexercise.com/)
- [Cypress API Testing Guide](https://docs.cypress.io/guides/guides/network-requests)

---

⭐ **Star this repository if you find it helpful!**
