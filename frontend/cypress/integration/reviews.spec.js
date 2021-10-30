import Chance from 'chance';
const chance = new Chance();

describe('Review works', ()=>{

    it('reviews exist under detailedmovie', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Learn More').first().click();
        cy.contains('great');

    });

    it('reviews can be written, added to database and shown', () => {

        const animal = chance.animal();

        //logs in user
        cy.contains('Log in').click();
        cy.get('input').eq(1).type('user');
        cy.get('input').eq(2).type('test');
        cy.wait(1000);
        cy.get('#logIn').click({force:true});
        cy.wait(1000);
        cy.get('#logIn').click({force:true});

        //visits a movie
        cy.contains('Learn More').first().click();

        
        cy.get('textarea').first().type('Average movie. Reminds me of '+animal);
        cy.get('button').eq(4).click();
        cy.wait(500);
        cy.contains('Average movie. Reminds me of '+animal);
    });
    
});