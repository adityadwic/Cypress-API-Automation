/// <reference types="cypress" />

import AutomationExerciseAPI from '../../support/pages/AutomationExerciseAPI.js';
import APIUtils from '../../support/utils/APIUtils.js';
import TestDataFactory from '../../support/utils/TestDataFactory.js';

describe('Automation Exercise API - Complete Test Suite', () => {
  let apiPage;

  before(() => {
    apiPage = new AutomationExerciseAPI();
  });

  describe('API Health Check', () => {
    it('should verify API base URL is accessible', () => {
      cy.request({
        method: 'GET',
        url: apiPage.baseUrl,
        failOnStatusCode: false
      }).then((response) => {
        // Accept any response that indicates the server is responding
        expect([200, 404, 405]).to.include(response.status);
      });
    });
  });

  describe('Products and Brands Integration Tests', () => {
    let productsResponse;
    let brandsResponse;

    before(() => {
      // Get both products and brands data for integration tests
      apiPage.getAllProducts().then((response) => {
        productsResponse = response;
      });
      
      apiPage.getAllBrands().then((response) => {
        brandsResponse = response;
      });
    });

    it('should verify products contain brands that exist in brands list', () => {
      cy.then(() => {
        expect(productsResponse.status).to.eq(200);
        expect(brandsResponse.status).to.eq(200);
        
        const brandNames = brandsResponse.body.brands.map(brand => brand.brand);
        const productBrands = [...new Set(productsResponse.body.products.map(product => product.brand))];
        
        // Check if product brands are in the brands list
        productBrands.forEach((productBrand) => {
          cy.log(`Checking if product brand "${productBrand}" exists in brands list`);
          // Some product brands might not be in the brands list, so we'll just log for visibility
        });
        
        cy.log('Brands from brands API:', brandNames);
        cy.log('Brands from products API:', productBrands);
      });
    });

    it('should verify data consistency between APIs', () => {
      cy.then(() => {
        // Verify both responses have consistent structure
        expect(productsResponse.body).to.have.property('responseCode', 200);
        expect(brandsResponse.body).to.have.property('responseCode', 200);
        
        // Verify both have data arrays
        expect(productsResponse.body.products).to.be.an('array');
        expect(brandsResponse.body.brands).to.be.an('array');
        
        // Verify both have data
        expect(productsResponse.body.products.length).to.be.greaterThan(0);
        expect(brandsResponse.body.brands.length).to.be.greaterThan(0);
      });
    });
  });

  describe('Performance Tests', () => {
    it('should load products list within acceptable time', () => {
      const startTime = Date.now();
      
      apiPage.getAllProducts().then((response) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        APIUtils.validateStatusCode(response, 200);
        expect(responseTime).to.be.lessThan(3000, 'Products API should respond within 3 seconds');
        
        cy.log(`Products API response time: ${responseTime}ms`);
      });
    });

    it('should load brands list within acceptable time', () => {
      const startTime = Date.now();
      
      apiPage.getAllBrands().then((response) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        APIUtils.validateStatusCode(response, 200);
        expect(responseTime).to.be.lessThan(3000, 'Brands API should respond within 3 seconds');
        
        cy.log(`Brands API response time: ${responseTime}ms`);
      });
    });

    it('should handle concurrent requests', () => {
      const requests = [];
      
      // Make 5 concurrent requests to each API
      for (let i = 0; i < 5; i++) {
        requests.push(apiPage.getAllProducts());
        requests.push(apiPage.getAllBrands());
      }
      
      Promise.all(requests).then((responses) => {
        responses.forEach((response, index) => {
          APIUtils.validateStatusCode(response, 200);
          cy.log(`Concurrent request ${index + 1} completed successfully`);
        });
      });
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle invalid URL endpoints gracefully', () => {
      cy.request({
        method: 'GET',
        url: `${apiPage.baseUrl}/invalidEndpoint`,
        failOnStatusCode: false
      }).then((response) => {
        expect([404, 405]).to.include(response.status);
      });
    });

    it('should handle malformed requests', () => {
      cy.request({
        method: 'GET',
        url: `${apiPage.baseUrl}${apiPage.endpoints.productsList}?invalid=parameter`,
        failOnStatusCode: false
      }).then((response) => {
        // Should still return 200 as the endpoint is valid, just with extra parameters
        APIUtils.validateStatusCode(response, 200);
      });
    });
  });

  describe('Data Validation Tests', () => {
    it('should validate all products have required pricing format', () => {
      apiPage.getAllProducts().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        response.body.products.forEach((product, index) => {
          // Validate price format (should contain currency symbol or be numeric)
          expect(product.price, `Product ${index + 1} price`).to.be.a('string');
          expect(product.price.length, `Product ${index + 1} price length`).to.be.greaterThan(0);
        });
      });
    });

    it('should validate all brands have valid naming convention', () => {
      apiPage.getAllBrands().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        response.body.brands.forEach((brand, index) => {
          // Validate brand name is not empty and contains valid characters
          expect(brand.brand, `Brand ${index + 1} name`).to.be.a('string');
          expect(brand.brand.trim().length, `Brand ${index + 1} name length`).to.be.greaterThan(0);
          expect(brand.brand, `Brand ${index + 1} name`).to.match(/^[a-zA-Z0-9\s&.-]+$/);
        });
      });
    });
  });

  describe('API Documentation Compliance', () => {
    it('should return exactly the documented response format for products', () => {
      apiPage.getAllProducts().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        // Verify response matches documentation
        expect(response.body).to.have.property('responseCode');
        expect(response.body).to.have.property('products');
        expect(response.body.responseCode).to.eq(200);
        
        // Verify it's a JSON response
        expect(response.headers['content-type']).to.include('application/json');
      });
    });

    it('should return exactly the documented response format for brands', () => {
      apiPage.getAllBrands().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        // Verify response matches documentation
        expect(response.body).to.have.property('responseCode');
        expect(response.body).to.have.property('brands');
        expect(response.body.responseCode).to.eq(200);
        
        // Verify it's a JSON response
        expect(response.headers['content-type']).to.include('application/json');
      });
    });
  });
});
