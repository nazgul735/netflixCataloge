import Chance from 'chance';
const chance = new Chance();


describe('When registering and logging in user', () => {
    const username = chance.character();
    const email = chance.email();
    const password = "advancedpassword";

    beforeEach(() => {
        cy.wait(150);
    })
    it('should load correct elements in DOM', () => {
        cy.visit('http://localhost:3000/');
        cy.clearLocalStorage();
        cy.contains('Log in').click();
        cy.contains('Or click here to register as a new user');
        cy.get('#logIn').should("exist");
    });

    it('should load register page correctly', () => {
        cy.contains('Or click here to register as a new user').click();
        cy.url().should('include','register');
    })

    it('should create a new user and successfully log the user in', () => {
        cy.get('input').eq(1).type(username);
        cy.get('input').eq(2).type(email);
        cy.get('input').eq(3).type(password);
        cy.get('input').eq(4).type(password);
       
        cy.contains('Register').click({ force: true });
        cy.wait(2000);
        cy.contains('Logged in as ' + username);
        //Asserting if token was correctly set in sessionStorage
        cy.window()
        .its("sessionStorage")
        .invoke("getItem", "jwt")
        .should("exist");
        //Assert redux store is correctly updated 
        cy.window().its('store').invoke('getState').its('isLoggedIn').should("eq",true)
    })

    it('logs out user', () => {
        cy.contains('Log out').click();
        cy.contains('Log in');
        //Asserting if token was correctly removed in sessionStorage
        cy.window()
        .its("sessionStorage")
        .invoke("getItem", "jwt")
        .should("eq",'');
        //Assert redux store is correctly updated 
        cy.window().its('store').invoke('getState').its('isLoggedIn').should("eq",false)
    })

    it('logs in user', () => {
        cy.contains('Log in').click();
        cy.get('input').eq(1).type(username);
        cy.get('input').eq(2).type(password);
        cy.wait(5000);
        cy.get('#logIn').click({force:true});
        cy.wait(5000);
        cy.get('#logIn').click({force:true});
        cy.contains('Logged in as ' + username);
        //Asserting if token was correctly set in sessionStorage
        cy.window()
        .its("sessionStorage")
        .invoke("getItem", "jwt")
        .should("exist");

        //Assert redux store is correctly updated 
        cy.window().its('store').invoke('getState').its('isLoggedIn').should("eq",true)
    })
});