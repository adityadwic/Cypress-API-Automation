const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')
const { isFileExist } = require('cy-verify-downloads')

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        isFileExist,
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        }
      })

      config.baseUrl = config.env.baseUrl

      return config
    },
    // API Testing specific configuration
    baseUrl: 'https://automationexercise.com',
    requestTimeout: 10000,
    responseTimeout: 10000,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 1
    },
    env: {
      apiBaseUrl: 'https://automationexercise.com/api'
    },
    // Test reporting configuration
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    }
  },
  'chromeWebSecurity': false,
});
