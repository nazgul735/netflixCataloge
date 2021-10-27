

// import Chance from 'chance';
// const chance = new Chance();

describe('Netflix database', () => {

    // const username = chance.animal();
    // const password = "advancedpassword";

     beforeEach(() => {
         cy.visit('http://localhost:3000/')
     })

      it('has a title', () => {
        cy.contains('Movie database');
    })

    it('Does not do much!', () => {
        expect(true).to.equal(true)
      })


      

});