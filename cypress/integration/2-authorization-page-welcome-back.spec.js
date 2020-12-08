Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


import * as homePage from '../locators/home-page.locators';
import * as authorizationPage from '../locators/authorization-page.locators';
import * as bundlesPage from '../locators/bundles-page.locators';


describe('2.Authorization page (Welcome back!)', () => {

    beforeEach(() => {
        //Visit Homepage
        cy.visit(Cypress.env('urlBase'))
    })

    it('Home page has to be opened', () => {
        //Checking menu items
        cy.get(homePage.menuItems).contains('Certs').should('be.visible')
        cy.get(homePage.menuItems).contains('Helpdesk').should('be.visible')
        cy.get(homePage.menuItems).contains('Blog').should('be.visible')
        cy.get(homePage.menuItems).contains('About Us').should('be.visible')
        cy.get(homePage.menuItems).contains('more').should('be.visible')

        //Checking "Log in" button
        cy.get(homePage.loginButton).contains('Log in').should('be.visible')

        //Checking headings
        cy.get(homePage.pageHeading).contains('Get up to 56% off on SSL').should('be.visible')
        cy.get(homePage.pageHeading).contains('Save & win').should('be.visible')
        cy.get(homePage.pageHeading).contains('SSL certificate benefits').should('be.visible')
        cy.get(homePage.pageHeading).contains('Compare validation types').should('be.visible')
        cy.get(homePage.pageHeading).contains('Why SSLs.com').should('be.visible')
        cy.get(homePage.pageHeading).contains('How SSL works').should('be.visible')
        cy.get(homePage.pageHeading).contains('What our customers say').should('be.visible')
        cy.get(homePage.pageHeading).contains('FAQ').should('be.visible')
        cy.get(homePage.pageHeading).contains('Let’s get started').should('be.visible')
        cy.get(homePage.pageHeading).contains('Stay savvy').should('be.visible')

        //Images are visible
        cy.get('img').should('be.visible')
    })


    it('Authorization page has to be opened - ("Log in" button redirect from Homepage to Authorization page)', () => {
        //Click on "Log in" button
        cy.get(homePage.loginButton).contains('Log in').should('be.visible').click()

        //Authorization page
        cy.url().should('include', Cypress.env('urlBase') + '/authorize')
        cy.get(homePage.pageTitle).contains('Authorization')

    })

    it('After click on "eye" icon for password field, password should be displayed', () => {
        //Click on "Log in" button on Home page
        cy.get(homePage.loginButton).contains('Log in').should('be.visible').click()

        //Type valid password
        cy.get(authorizationPage.passwordField).type(Cypress.env('validPassword'))

        //Check that the password is invisible
        cy.get(authorizationPage.passwordInputField).should('have.attr', 'type', 'password')

        //Click on showPassword icon
        cy.get(authorizationPage.showPasswordIcon).should('be.visible').click()

        //Check that the password is visible
        cy.get(authorizationPage.passwordInputField).should('have.attr', 'type', 'text')
    })

    it('"Log in" button has to be changed on "User @ email" button (with dropdown menu) from the left side in the Header of the page', () => {
        //Click on "Log in" button on Home page
        cy.get(homePage.loginButton).contains('Log in').should('be.visible').click()

        //Type valid email
        cy.get(authorizationPage.emailField).type(Cypress.env('validLogin'))

        //Type valid password
        cy.get(authorizationPage.passwordField).type(Cypress.env('validPassword'))

        //Click on "Login" button on Authorization page
        cy.get(authorizationPage.loginButtonAuthorizationPage).contains('Login').should('be.visible').click()


        //"You are successfully logged in"
        cy.get(bundlesPage.toolbarTitle).contains('My SSL')
        cy.log('You are successfully logged in')

        //"Log in" button has to be changed on "User @ email" button (with dropdown menu)
        cy.get(homePage.loginButton).contains('ssls.automation+666@gmail.com').should('be.visible')
    })
})