/// <reference types="cypress" />

import AutomationExerciseAPI from '../../support/pages/AutomationExerciseAPI.js';
import APIUtils from '../../support/utils/APIUtils.js';
import TestDataFactory from '../../support/utils/TestDataFactory.js';

describe('Automation Exercise API - Brands Tests', () => {
  let apiPage;
  let testData;

  before(() => {
    apiPage = new AutomationExerciseAPI();
    testData = TestDataFactory.getBrandsTestData();
  });

  describe('API 3: Get All Brands List', () => {
    it('should successfully get all brands list with GET method', () => {
      apiPage.getAllBrands().then((response) => {
        // Log response details for debugging
        APIUtils.logResponseDetails(response, 'Get All Brands');
        
        // Validate status code
        APIUtils.validateStatusCode(response, 200);
        
        // Validate response time
        APIUtils.validateResponseTime(response, 5000);
        
        // Validate response structure
        APIUtils.validateBrandsListStructure(response);
        
        // Validate response contains brands
        expect(response.body.brands).to.be.an('array');
        expect(response.body.brands.length).to.be.greaterThan(0);
        
        // Validate response code in body
        expect(response.body.responseCode).to.eq(200);
        
        // Validate each brand has required fields
        response.body.brands.forEach((brand) => {
          testData.expectedFields.forEach((field) => {
            expect(brand).to.have.property(field);
          });
          
          // Validate data types
          expect(brand.id).to.be.a('number');
          expect(brand.brand).to.be.a('string');
          expect(brand.brand.length).to.be.greaterThan(0);
        });
        
        // Validate some expected brands are present
        const brandNames = response.body.brands.map(brand => brand.brand);
        testData.expectedBrands.forEach((expectedBrand) => {
          expect(brandNames).to.include(expectedBrand);
        });
        
        // Log all brands for verification
        cy.log('All brands:', brandNames);
      });
    });

    it('should validate brands list contains specific brand structure', () => {
      apiPage.getAllBrands().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        // Validate each brand object structure
        response.body.brands.forEach((brand, index) => {
          expect(brand, `Brand at index ${index}`).to.have.all.keys(['id', 'brand']);
          expect(brand.id, `Brand ID at index ${index}`).to.be.a('number').and.be.greaterThan(0);
          expect(brand.brand, `Brand name at index ${index}`).to.be.a('string').and.not.be.empty;
        });
      });
    });

    it('should validate brands list is sorted by ID', () => {
      apiPage.getAllBrands().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        const brandIds = response.body.brands.map(brand => brand.id);
        const sortedIds = [...brandIds].sort((a, b) => a - b);
        
        expect(brandIds).to.deep.equal(sortedIds, 'Brands should be sorted by ID');
      });
    });

    it('should not allow POST method for brands list endpoint', () => {
      cy.request({
        method: 'POST',
        url: `${apiPage.baseUrl}${apiPage.endpoints.brandsList}`,
        failOnStatusCode: false
      }).then((response) => {
        APIUtils.validateStatusCode(response, 405);
        APIUtils.validateErrorResponse(
          response, 
          405, 
          TestDataFactory.getErrorMessages().invalidMethod
        );
      });
    });

    it('should not allow PUT method for brands list endpoint', () => {
      cy.request({
        method: 'PUT',
        url: `${apiPage.baseUrl}${apiPage.endpoints.brandsList}`,
        failOnStatusCode: false
      }).then((response) => {
        APIUtils.validateStatusCode(response, 405);
        APIUtils.validateErrorResponse(
          response, 
          405, 
          TestDataFactory.getErrorMessages().invalidMethod
        );
      });
    });

    it('should not allow DELETE method for brands list endpoint', () => {
      cy.request({
        method: 'DELETE',
        url: `${apiPage.baseUrl}${apiPage.endpoints.brandsList}`,
        failOnStatusCode: false
      }).then((response) => {
        APIUtils.validateStatusCode(response, 405);
        APIUtils.validateErrorResponse(
          response, 
          405, 
          TestDataFactory.getErrorMessages().invalidMethod
        );
      });
    });

    it('should validate response headers', () => {
      apiPage.getAllBrands().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        // Validate common response headers
        APIUtils.validateResponseHeader(response, 'content-type');
        expect(response.headers['content-type']).to.include('application/json');
        
        // Validate server header if present
        if (response.headers.server) {
          expect(response.headers.server).to.be.a('string');
        }
      });
    });

    it('should validate unique brand IDs', () => {
      apiPage.getAllBrands().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        const brandIds = response.body.brands.map(brand => brand.id);
        const uniqueIds = [...new Set(brandIds)];
        
        expect(brandIds.length).to.equal(uniqueIds.length, 'All brand IDs should be unique');
      });
    });

    it('should validate unique brand names', () => {
      apiPage.getAllBrands().then((response) => {
        APIUtils.validateStatusCode(response, 200);
        
        const brandNames = response.body.brands.map(brand => brand.brand);
        const uniqueNames = [...new Set(brandNames)];
        
        expect(brandNames.length).to.equal(uniqueNames.length, 'All brand names should be unique');
      });
    });
  });
});
