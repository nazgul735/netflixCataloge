import Chance from 'chance';
const chance = new Chance();


describe('Register user + logout and login', () => {
    const username = chance.character();
    const email = chance.email();
    const password = "advancedpassword";

    beforeEach(() => {
        cy.wait(150);
    })
    

    it('login button loads', () => {
        cy.visit('http://localhost:3000/');
        cy.clearLocalStorage();
        cy.contains('Log in').click();
        cy.contains('Or click here to register as a new user');
    });

    it('register button and page loads', () => {
        cy.contains('Or click here to register as a new user').click();

        cy.url().should('include','register');

    })

    it('registering a new user works', () => {
        cy.get('input').eq(1).type(username);
        cy.get('input').eq(2).type(email);
        cy.get('input').eq(3).type(password);
        cy.get('input').eq(4).type(password);
       
        cy.contains('Register').click({ force: true });
        cy.wait(2000);
        cy.contains('Logged in as ' + username);

    })

    it('logs out user', () => {
        cy.contains('Log out').click();
        cy.contains('Log in');
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

    })
});