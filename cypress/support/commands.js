// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command for API requests with enhanced logging
 */
Cypress.Commands.add('apiRequest', (method, url, body = null, options = {}) => {
  const requestOptions = {
    method: method,
    url: url,
    failOnStatusCode: false,
    ...options
  };

  if (body) {
    requestOptions.body = body;
  }

  return cy.request(requestOptions).then((response) => {
    // Log request details
    cy.log(`API Request: ${method} ${url}`);
    cy.log(`Response Status: ${response.status}`);
    cy.log(`Response Time: ${response.duration}ms`);
    
    return cy.wrap(response);
  });
});

/**
 * Custom command for validating API response structure
 */
Cypress.Commands.add('validateApiResponse', (response, expectedStatus = 200) => {
  expect(response.status).to.eq(expectedStatus);
  expect(response.body).to.exist;
  expect(response.duration).to.be.lessThan(10000); // 10 second timeout
  
  return cy.wrap(response);
});

/**
 * Custom command for automation exercise API requests
 */
Cypress.Commands.add('automationExerciseApi', (endpoint, method = 'GET', body = null) => {
  const baseUrl = 'https://automationexercise.com/api';
  
  return cy.apiRequest(method, `${baseUrl}${endpoint}`, body);
});

/**
 * Custom command to wait for API to be ready
 */
Cypress.Commands.add('waitForApiReady', (maxRetries = 3) => {
  let retries = 0;
  
  const checkApi = () => {
    return cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/productsList',
      failOnStatusCode: false,
      timeout: 10000
    }).then((response) => {
      if (response.status === 200) {
        cy.log('API is ready');
        return cy.wrap(response);
      } else if (retries < maxRetries) {
        retries++;
        cy.log(`API not ready, retry ${retries}/${maxRetries}`);
        cy.wait(2000);
        return checkApi();
      } else {
        throw new Error('API is not ready after maximum retries');
      }
    });
  };
  
  return checkApi();
});

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })