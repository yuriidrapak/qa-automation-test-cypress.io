// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


import * as homePage from '../locators/home-page.locators';
import * as authorizationPage from '../locators/authorization-page.locators';
import * as bundlesPage from '../locators/bundles-page.locators';

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