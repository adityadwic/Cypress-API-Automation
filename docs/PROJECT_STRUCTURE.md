# 📁 Project Structure

## 📂 Root Directory
```
Cypress-API-Automation/
├── 📄 README.md                    # Main project documentation
├── 📄 package.json                 # Dependencies and scripts
├── 📄 cypress.config.js            # Cypress configuration
├── 📄 LICENSE                      # Project license
├── 📄 .gitignore                   # Git ignore rules
├── 📁 docs/                        # Documentation files
├── 📁 cypress/                     # Cypress test files and assets
└── 📁 node_modules/                # Dependencies (ignored by git)
```

## 📁 Cypress Directory Structure
```
cypress/
├── 📁 e2e/                         # Test files
│   └── 📁 API-AutomationExerice/
│       ├── 🧪 simple-api-tests.cy.js        # Basic API tests
│       ├── 🧪 products-api.cy.js            # Products API tests
│       ├── 🧪 brands-api.cy.js              # Brands API tests
│       └── 🧪 complete-api-suite.cy.js      # Integration tests
├── 📁 support/                     # Support files
│   ├── 📄 commands.js              # Custom Cypress commands
│   ├── 📄 e2e.js                   # Global configuration
│   ├── 📁 pages/                   # Page Object Model files
│   │   └── 📄 AutomationExerciseAPI.js
│   └── 📁 utils/                   # Utility functions
│       ├── 📄 APIUtils.js          # API testing utilities
│       └── 📄 TestDataFactory.js   # Test data generation
└── 📁 reports/                     # Generated test reports
    ├── 📄 *.json                   # Raw test data
    └── 📁 html/                    # HTML reports
        └── 📄 merged-report.html
```

## 📁 Documentation Directory
```
docs/
├── 📄 REPORTING.md                 # Test reporting guide
└── 📄 TEST_REPORT.md               # Latest test execution results
```

## 🎯 Key Files Description

### Core Configuration Files
- **`package.json`** - Project dependencies, scripts, and metadata
- **`cypress.config.js`** - Cypress framework configuration
- **`.gitignore`** - Files and directories to ignore in version control

### Test Files
- **`simple-api-tests.cy.js`** - Main working tests (8 passing tests)
- **`products-api.cy.js`** - Comprehensive products API testing with POM
- **`brands-api.cy.js`** - Comprehensive brands API testing with POM  
- **`complete-api-suite.cy.js`** - Integration testing between APIs

### Support Files
- **`commands.js`** - Custom Cypress commands for reusability
- **`e2e.js`** - Global test configuration and setup
- **`AutomationExerciseAPI.js`** - Page Object Model for API interactions
- **`APIUtils.js`** - Utility functions for API validations
- **`TestDataFactory.js`** - Test data generation and management

### Documentation
- **`README.md`** - Main project documentation and usage guide
- **`REPORTING.md`** - Guide for generating and viewing test reports
- **`TEST_REPORT.md`** - Detailed results from latest test execution

## 🧹 Cleaned Up Files

The following files were removed during project cleanup:
- ❌ `working-api-tests.cy.js` (empty file)
- ❌ `debug-api.cy.js` (empty file)
- ❌ `jsonplaceholder-example.cy.js` (empty file)
- ❌ `custom-commands-demo.cy.js` (empty file)
- ❌ `API-Testing-README.md` (empty file)
- ❌ `CONTRIBUTING.md` (empty file)
- ❌ `DEPLOYMENT.md` (empty file)

## 📊 Report Files Structure

Test reports are automatically generated in the `cypress/reports/` directory:
- **JSON files** - Raw test execution data
- **HTML reports** - Interactive web-based reports in `html/` subdirectory
- **Assets** - CSS, JS, and font files for HTML reports
