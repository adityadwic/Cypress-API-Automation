/// <reference types="cypress" />

describe('Simple API Tests - Automation Exercise', () => {
  
  describe('API 1: Get All Products List', () => {
    it('should successfully get all products list', () => {
      cy.request('GET', 'https://automationexercise.com/api/productsList')
        .then((response) => {
          expect(response.status).to.eq(200);
          
          // Parse the response if it's a string
          const responseData = typeof response.body === 'string' 
            ? JSON.parse(response.body) 
            : response.body;
          
          expect(responseData).to.have.property('responseCode', 200);
          expect(responseData).to.have.property('products');
          expect(responseData.products).to.be.an('array');
          expect(responseData.products.length).to.be.greaterThan(0);
          
          // Validate first product structure
          const firstProduct = responseData.products[0];
          expect(firstProduct).to.have.property('id');
          expect(firstProduct).to.have.property('name');
          expect(firstProduct).to.have.property('price');
          expect(firstProduct).to.have.property('brand');
          
          cy.log(`Successfully retrieved ${responseData.products.length} products`);
        });
    });

    it('should handle POST method (should return method not supported)', () => {
      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/productsList',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        
        const responseData = typeof response.body === 'string' 
          ? JSON.parse(response.body) 
          : response.body;
        
        expect(responseData).to.have.property('responseCode', 405);
        expect(responseData).to.have.property('message', 'This request method is not supported.');
      });
    });
  });

  describe('API 3: Get All Brands List', () => {
    it('should successfully get all brands list', () => {
      cy.request('GET', 'https://automationexercise.com/api/brandsList')
        .then((response) => {
          expect(response.status).to.eq(200);
          
          // Parse the response if it's a string
          const responseData = typeof response.body === 'string' 
            ? JSON.parse(response.body) 
            : response.body;
          
          expect(responseData).to.have.property('responseCode', 200);
          expect(responseData).to.have.property('brands');
          expect(responseData.brands).to.be.an('array');
          expect(responseData.brands.length).to.be.greaterThan(0);
          
          // Validate first brand structure
          const firstBrand = responseData.brands[0];
          expect(firstBrand).to.have.property('id');
          expect(firstBrand).to.have.property('brand');
          expect(firstBrand.id).to.be.a('number');
          expect(firstBrand.brand).to.be.a('string');
          
          cy.log(`Successfully retrieved ${responseData.brands.length} brands`);
          
          // Log some brands for verification
          const brandNames = responseData.brands.map(brand => brand.brand);
          cy.log('Available brands:', brandNames.slice(0, 5).join(', '));
        });
    });

    it('should contain expected brands', () => {
      cy.request('GET', 'https://automationexercise.com/api/brandsList')
        .then((response) => {
          const responseData = typeof response.body === 'string' 
            ? JSON.parse(response.body) 
            : response.body;
          
          const brandNames = responseData.brands.map(brand => brand.brand);
          
          // Check for expected brands
          expect(brandNames).to.include('Polo');
          expect(brandNames).to.include('H&M');
          expect(brandNames).to.include('Madame');
          expect(brandNames).to.include('Biba');
        });
    });

    it('should handle POST method (should return method not supported)', () => {
      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/brandsList',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        
        const responseData = typeof response.body === 'string' 
          ? JSON.parse(response.body) 
          : response.body;
        
        expect(responseData).to.have.property('responseCode', 405);
        expect(responseData).to.have.property('message', 'This request method is not supported.');
      });
    });
  });

  describe('Integration and Performance Tests', () => {
    it('should verify both APIs respond within acceptable time', () => {
      cy.request('GET', 'https://automationexercise.com/api/productsList')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.duration).to.be.lessThan(5000);
          cy.log(`Products API responded in ${response.duration}ms`);
        });

      cy.request('GET', 'https://automationexercise.com/api/brandsList')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.duration).to.be.lessThan(5000);
          cy.log(`Brands API responded in ${response.duration}ms`);
        });
    });

    it('should verify data consistency between products and brands', () => {
      let brandsData, productsData;

      cy.request('GET', 'https://automationexercise.com/api/brandsList')
        .then((response) => {
          brandsData = typeof response.body === 'string' 
            ? JSON.parse(response.body) 
            : response.body;
          
          return cy.request('GET', 'https://automationexercise.com/api/productsList');
        })
        .then((response) => {
          productsData = typeof response.body === 'string' 
            ? JSON.parse(response.body) 
            : response.body;
          
          const brandNames = brandsData.brands.map(brand => brand.brand);
          const productBrands = [...new Set(productsData.products.map(product => product.brand))];
          
          cy.log('Available brands from brands API:', brandNames);
          cy.log('Brands used in products:', productBrands);
          
          // Verify some product brands exist in the brands list
          const commonBrands = productBrands.filter(productBrand => 
            brandNames.includes(productBrand)
          );
          
          expect(commonBrands.length).to.be.greaterThan(0, 
            'Some product brands should exist in the brands list');
          
          cy.log(`Found ${commonBrands.length} common brands between both APIs`);
        });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid endpoints gracefully', () => {
      cy.request({
        method: 'GET',
        url: 'https://automationexercise.com/api/invalidEndpoint',
        failOnStatusCode: false
      }).then((response) => {
        // Should return some error status
        expect([404, 405, 500]).to.include(response.status);
      });
    });
  });
});
