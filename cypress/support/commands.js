import * as homePage from '../page-objects/home-page.pages';
import * as authorizationPage from '../page-objects/authorization-page.pages';
import * as bundlesPage from '../page-objects/bundles-page.pages';

//Login command using UI
Cypress.Commands.add("loginUi", (user) => {

    //Visit Authorization page
    cy.visit(Cypress.env('urlBase') + '/authorize')
    cy.get(homePage.pageTitle).contains('Authorization')

    //Type valid email
    cy.get(authorizationPage.emailField).type(user.email)

    //Type valid password
    cy.get(authorizationPage.passwordField).type(user.password)

    //Click on "Login" button on Authorization page
    cy.get(authorizationPage.loginButtonAuthorizationPage).contains('Login').should('be.visible').click()

    //"You are successfully logged in"
    cy.get(bundlesPage.toolbarTitle).contains('My SSL')
    cy.log('You are successfully logged in')

})