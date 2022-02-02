/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      blogs: [],
      username: 'naiswan',
      name: 'Trungdepzai',
      password: '54321',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('LOGIN');
  });
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('naiswan');
      cy.get('#password').type('54321');
      cy.get('#login-button').click();
      cy.contains('Trungdepzai logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('blank');
      cy.get('#password').type('09090');
      cy.get('#login-button').click();
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Trungdepzai loggin in');
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'naiswan', password: '54321' });
      });
      it('A new blog can be created', function () {
        cy.contains('create').click();
        cy.get('#title').type('A blog created by cypress');
        cy.get('#author').type('pateno');
        cy.get('#url').type('www.pateno_cypress.com');
        cy.contains('Create new blog').click();
        cy.contains('A blog created by cypress');
      });

      describe('Checks', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'New day',
            author: 'Reppat',
            url: 'www.createRef.org',
            likes: 5,
          });
        });
        it('users can like it', function () {
          cy.get('.blog').contains('show').click();
          cy.get('.blog').get('#like').click();
          cy.get('.blog-info').contains(6);
        });
        it('users can delete it', function () {
          cy.get('.blog').contains('show').click();
          cy.get('.blog').get('#rm').click();
          cy.get('html').should('not.contain', 'New day');
        });
      });
    });
  });
});
