/// <reference types="cypress" />

import AutomationExerciseAPI from '../../support/pages/AutomationExerciseAPI.js';
import APIUtils from '../../support/utils/APIUtils.js';
import TestDataFactory from '../../support/utils/TestDataFactory.js';

describe('Automation Exercise API - Products Tests', () => {
  let apiPage;
  let testData;

  before(() => {
    apiPage = new AutomationExerciseAPI();
    testData = TestDataFactory.getProductsTestData();
  });

  describe('API 1: Get All Products List', () => {
    it('should successfully get all products list with GET method', () => {
      apiPage.getAllProducts().then((response) => {
        // Log response details for debugging
        APIUtils.logResponseDetails(response, 'Get All Products');
        
        // Validate status code
        APIUtils.validateStatusCode(response, 200);
        
        // Validate response time
        APIUtils.validateResponseTime(response, 5000);
        
        // Validate response structure
        APIUtils.validateProductsListStructure(response);
        
        // Validate response contains products
        expect(response.body.products).to.be.an('array');
        expect(response.body.products.length).to.be.greaterThan(0);
        
        // Validate response code in body
        expect(response.body.responseCode).to.eq(200);
        
        // Validate each product has required fields
        response.body.products.forEach((product) => {
          testData.expectedFields.forEach((field) => {
            expect(product).to.have.property(field);
          });
          
          // Validate data types
          expect(product.id).to.be.a('number');
          expect(product.name).to.be.a('string');
          expect(product.price).to.be.a('string');
          expect(product.brand).to.be.a('string');
        });
        
        // Log first few products for verification
        cy.log('First 3 products:', response.body.products.slice(0, 3));
      });
    });

    it('should not allow POST method for products list endpoint', () => {
      cy.request({
        method: 'POST',
        url: `${apiPage.baseUrl}${apiPage.endpoints.productsList}`,
        failOnStatusCode: false
      }).then((response) => {
        APIUtils.validateStatusCode(response, 200);
        APIUtils.validateErrorResponse(
          response, 
          405, 
          TestDataFactory.getErrorMessages().invalidMethod
        );
      });
    });

    it('should not allow PUT method for products list endpoint', () => {
      cy.request({
        method: 'PUT',
        url: `${apiPage.baseUrl}${apiPage.endpoints.productsList}`,
        failOnStatusCode: false
      }).then((response) => {
        APIUtils.validateStatusCode(response, 200);
        APIUtils.validateErrorResponse(
          response, 
          405, 
          TestDataFactory.getErrorMessages().invalidMethod
        );
      });
    });

    it('should not allow DELETE method for products list endpoint', () => {
      cy.request({
        method: 'DELETE',
        url: `${apiPage.baseUrl}${apiPage.endpoints.productsList}`,
        failOnStatusCode: false
      }).then((response) => {
        APIUtils.validateStatusCode(response, 200);
        APIUtils.validateErrorResponse(
          response, 
          405, 
          TestDataFactory.getErrorMessages().invalidMethod
        );
      });
    });
  });

  describe('Product Search Tests', () => {
    it('should successfully search for products', () => {
      const searchTerm = testData.searchTerms.valid[0];
      
      apiPage.searchProduct(searchTerm).then((response) => {
        APIUtils.logResponseDetails(response, 'Search Products');
        APIUtils.validateStatusCode(response, 200);
        APIUtils.validateProductsListStructure(response);
        
        // Validate search results contain the search term
        if (response.body.products && response.body.products.length > 0) {
          const foundProducts = response.body.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          expect(foundProducts.length).to.be.greaterThan(0);
        }
      });
    });

    it('should handle search with empty parameter', () => {
      apiPage.searchProduct(testData.searchTerms.empty).then((response) => {
        APIUtils.validateStatusCode(response, 400);
        APIUtils.validateErrorResponse(
          response, 
          400, 
          TestDataFactory.getErrorMessages().missingParameter
        );
      });
    });
  });
});
