
// import Chance from 'chance';
// const chance = new Chance();


describe('Basics loading', () => {

    

     beforeEach(() => {
         cy.visit('http://localhost:3000/');
         cy.clearLocalStorage();
     })

      it('has a title', () => {
        //cy.pause();
        
        cy.contains('Movie database');
    })

    it('Movies load', () => {
        
        
        cy.contains('Hannah')
        cy.contains('Game Night')
        cy.contains('They Remain')
      })

    it('Detailedmovies load', () =>{
        //cy.pause();
        cy.wait(300);
        cy.contains('Learn More').first().click();
        cy.wait(500);
        cy.contains('Description');
        cy.contains('Rachel McAdams');

    })


});

// describe('Register user + logout and login', () => {
//     const username = chance.character();
//     const email = chance.email();
//     const password = "advancedpassword";
    

//     it('login button loads', () => {
//         cy.pause();
//         cy.contains('Log in').click();
//         cy.contains('Or click here to register as a new user');
//     });

//     it('register button and page loads', () => {
//         cy.contains('Or click here to register as a new user').click();

//         cy.url().should('include','register');

//     })

//     it('registering a new user works', () => {
//         //makes random usernames
        
        
//         cy.get('input').eq(1).type(username);
//         cy.get('input').eq(2).type(email);
//         cy.get('input').eq(3).type(password);
//         cy.get('input').eq(4).type(password);
       
//         cy.contains('Register').click();
//         cy.wait(2000);
//         cy.contains('Logged in as ' + username);

//     })

//     it('logs out user', () => {
//         cy.contains('Log out').click();
//         cy.contains('Log in');
//     })

//     it('logs in user', () => {
//         cy.contains('Log in').click();
//         cy.get('input').eq(1).type(username);
//         cy.get('input').eq(2).type(password);
//         cy.wait(5000);
//         cy.get('button').eq(3).click();
//         cy.wait(5000);
//         cy.location('http://localhost:3000/', {timeout: 60000})
//         .should('not.include', '/login');
//         cy.contains(username);


//     })
// });

// describe('Review works', ()=>{

//     it('reviews exist under detailedmovie', () => {
//         cy.pause();
//         cy.wait(300);
//         cy.contains('Learn More').first().click();
//         cy.contains('great');

//     });

//     it('reviews can be written', () => {

//         cy.wait(300);
//         cy.get('input').eq(1);
//     });

// });