Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})



import * as homePage from '../page-objects/home-page.pages';
import * as bundlesPage from '../page-objects/bundles-page.pages';
import * as profilePage from '../page-objects/profile-page.pages';

describe('3.My profile page. Client area', () => {
    it('After click on "Profile" opened page "Profile" should be displayed', () => {
        //Login command using UI
        cy.loginUi({
            email: Cypress.env('validLogin'),
            password: Cypress.env('validPassword')
        })

        //Click on "User @ email" button (with dropdown menu)
        cy.get(homePage.loginButton).contains('ssls.automation+666@gmail.com').should('be.visible').click()

        //Click on Profile button
        cy.get(bundlesPage.profileButton).contains('Profile').should('be.visible').click()

        //Profile page
        cy.url().should('include', Cypress.env('urlBase') + '/user/profile')
        cy.get(homePage.pageTitle).contains('Profile')

    })

    context('Check that opened page has to contain values in the next fields and compare with values saved to variable from precondition', () => {
        it('Name', () => {
            cy.get(profilePage.valueName).eq(0).contains('Name')
            cy.get(profilePage.valueSaved).eq(0).contains('Tom Ford')
        })

        it('Email', () => {
            cy.get(profilePage.valueName).eq(1).contains('Email')
            cy.get(profilePage.valueSaved).eq(1).contains(Cypress.env('validLogin'))
        })

        it('Password (not empty)', () => {
            cy.get(profilePage.valueName).eq(2).contains('Password')
            cy.get(profilePage.valueSaved).eq(2).should('not.be.empty')
        })

        it('Phone', () => {
            cy.get(profilePage.valueName).eq(3).contains('Phone')
            cy.get(profilePage.valueSaved).eq(3).contains('+380 12312312')
        })

        it('Address', () => {
            cy.get(profilePage.valueName).eq(4).contains('Address')
            cy.get(profilePage.valueSaved).eq(4).contains('Diagon alley 21, Misto, Uryupinsk 612120, Ukraine')
        })

        it('Support pin', () => {
            cy.get(profilePage.valueName).eq(5).contains('Support pin')
            cy.get(profilePage.valueSaved).eq(5).contains('DeD3')
        })

        it('Newsletter', () => {
            cy.get(profilePage.valueName).eq(6).contains('Newsletter')
            cy.get(profilePage.mailingSwitch).eq(0).contains('Include in mailing list')
        })

    })

})