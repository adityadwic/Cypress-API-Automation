# 📊 Test Reporting Guide

This document explains how to generate and view test reports for the Cypress API Automation project.

## 🎯 Available Report Types

### 1. **HTML Report (Recommended)**
- Interactive web-based report
- Visual charts and graphs  
- Detailed test results with screenshots
- Easy to share and view

### 2. **Markdown Report**
- Static text-based report (`TEST_REPORT.md`)
- GitHub-friendly format
- Manual documentation

### 3. **Console Output**
- Real-time test execution feedback
- Basic pass/fail status
- Execution time metrics

## 🚀 Generating Reports

### Quick Report Generation

```bash
# Generate HTML report with test execution
npm run test:report

# Clean old reports and generate new ones
npm run clean:reports && npm run test:report

# Open the generated HTML report
npm run report:open
```

### Individual Test Reports

```bash
# Run specific tests and generate reports
npm run test:simple     # Main tests only
npm run test:products   # Products API tests
npm run test:brands     # Brands API tests  
npm run test:complete   # Integration tests
npm run test:all        # All API tests

# Generate report from existing JSON files
npm run generate:report
```

## 📁 Report Locations

```
cypress/reports/
├── 📄 mochawesome_MMDDYYYY_HHMMSS.json    # Raw test data
├── 📄 mochawesome_MMDDYYYY_HHMMSS.html    # Individual HTML report
├── 📄 merged-report.json                   # Combined test data
└── 📁 html/
    └── 📄 merged-report.html               # 🎯 MAIN HTML REPORT
```

## 🖥️ Viewing Reports

### HTML Report Features

The HTML report includes:

- ✅ **Test Summary Dashboard**
  - Total tests, pass/fail counts
  - Success rate percentage
  - Execution duration

- 📊 **Visual Charts**
  - Pass/Fail pie chart
  - Duration metrics
  - Test suite breakdown

- 📋 **Detailed Test Results**
  - Individual test status
  - Execution times
  - Error messages (if any)
  - Screenshots (on failures)

- 🔍 **Filtering Options**
  - Filter by status (passed/failed/skipped)
  - Search by test name
  - Sort by duration or status

### Opening Reports

```bash
# Automatically open in default browser (macOS)
npm run report:open

# Manual navigation
open cypress/reports/html/merged-report.html

# Or navigate to:
file:///path/to/project/cypress/reports/html/merged-report.html
```

## ⚙️ Report Configuration

The reporting is configured in `cypress.config.js`:

```javascript
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true,
  timestamp: 'mmddyyyy_HHMMss'
}
```

### Customization Options

| Option | Description | Default |
|--------|-------------|---------|
| `reportDir` | Output directory | `cypress/reports` |
| `overwrite` | Overwrite existing reports | `false` |
| `html` | Generate HTML reports | `true` |
| `json` | Generate JSON data | `true` |
| `timestamp` | Add timestamp to filenames | `mmddyyyy_HHMMss` |

## 🔄 CI/CD Integration

### GitHub Actions

The reports are automatically generated in CI/CD:

```yaml
- name: 📊 Upload Test Reports
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: test-reports
    path: cypress/reports/html/
    retention-days: 30
```

### Scheduled Reporting

```bash
# Daily report generation (example)
0 6 * * * cd /path/to/project && npm run test:report
```

## 📈 Report Metrics

### Key Performance Indicators

The reports track:

- **Pass Rate**: Percentage of successful tests
- **Execution Time**: Total and individual test durations  
- **Trend Analysis**: Historical test performance
- **Coverage**: API endpoints tested
- **Reliability**: Consistency over multiple runs

### Sample Metrics

```
📊 Current Results:
✅ Tests Passed: 8/8 (100%)
⏱️ Execution Time: 3-4 seconds
🎯 Success Rate: 100%
📈 Performance: Excellent
```

## 🛠️ Troubleshooting

### Common Issues

1. **Reports not generating**
   ```bash
   # Check mochawesome installation
   npm list mochawesome
   
   # Reinstall if needed
   npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
   ```

2. **HTML report not opening**
   ```bash
   # Manually check file exists
   ls -la cypress/reports/html/
   
   # Use different browser
   firefox cypress/reports/html/merged-report.html
   ```

3. **Old reports interfering**
   ```bash
   # Clean all reports
   npm run clean:reports
   
   # Generate fresh reports
   npm run test:report
   ```

## 🎨 Report Customization

### Custom Styling

You can customize the HTML report appearance by:

1. Creating custom CSS files
2. Using mochawesome themes
3. Adding company logos/branding

### Additional Reporters

```bash
# Install additional reporters
npm install --save-dev cypress-multi-reporters

# Configure multiple outputs
# - HTML for viewing
# - JUnit for CI/CD
# - JSON for analysis
```

## 📋 Best Practices

### Regular Reporting

1. **Generate reports after each test run**
2. **Archive important reports with timestamps**
3. **Share HTML reports with stakeholders**
4. **Track metrics over time**

### Report Management

```bash
# Keep reports organized
├── reports/
│   ├── daily/
│   ├── releases/
│   └── current/

# Automate cleanup (keep last 30 days)
find cypress/reports -name "*.html" -mtime +30 -delete
```

---

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run test:report` | Run tests + generate HTML report |
| `npm run generate:report` | Generate report from existing data |
| `npm run clean:reports` | Remove all report files |
| `npm run report:open` | Open latest HTML report |

**Report Location:** `cypress/reports/html/merged-report.html`  
**Raw Data:** `cypress/reports/*.json`  
**Documentation:** `TEST_REPORT.md`

---

*For technical support, check the [mochawesome documentation](https://github.com/adamgruber/mochawesome) or project issues.*
