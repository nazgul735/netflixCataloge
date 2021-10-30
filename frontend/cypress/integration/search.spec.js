import { aliasQuery} from '../utils/graphql-test-utils';
describe('When searching', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/');
  })

   it('should return movies with title containing search string', () => {
     cy.get("#searchMovies").type("hannah");
     cy.get('#movies').first().should('include.text', 'Hannah');
     cy.get('#movies').should('have.length', 1);
 });
});

describe('When filtering on genre', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.get("#filterButton").click();
      cy.intercept('POST', 'http://it2810-38.idi.ntnu.no:4000/', (req) => {
        aliasQuery(req,'GetMoviesQuery')
      })
  })

   it('should return filtered movies on genre correctly', () => {
     cy.get('#dropdownSelectGenre').click();
     cy.get('[data-value="Action"]').click();
     cy.get("#applyFilter").click();
     const response= cy.wait(`@GetMoviesQuery`)
     .its('response.body.data.getMovies.movies');
     response.should("have.length",12);
     response.each((movie)=>{expect(movie.genres).to.include("Action")});
     //Testing redux store is set correctly
     cy.window().its('store').invoke('getState').its('searchQueries').should("deep.equal",{
          "searchQueries":{
            fromYear: 0,
            selectedGenre: "Action",
            toYear: 0}
        }
      )
 });
});

describe('When filtering on year', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.get("#filterButton").click();
      cy.intercept('POST', 'http://it2810-38.idi.ntnu.no:4000/', (req) => {
        aliasQuery(req,'GetMoviesQuery')
      })
  })

   it('should return filtered movies on year correctly', () => {
    cy.get('#fromYear').type(2017);
    cy.get('#toYear').type(2018);
     cy.get("#applyFilter").click();
     const response= cy.wait(`@GetMoviesQuery`)
     .its('response.body.data.getMovies.movies');
     response.each((movie)=>{
       expect(parseInt(movie.year)).to.be.at.least(2017);
       expect(parseInt(movie.year)).to.be.at.most(2018);
      });
      //Assert redux store is set correctly
      cy.window().its('store').invoke('getState').its('searchQueries').should("deep.equal",{
        "searchQueries":{
          fromYear: 2017,
          selectedGenre: "",
          toYear: 2018}
      }
    )
 });
});


describe('When filtering on both genre and year', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.get("#filterButton").click();
      cy.intercept('POST', 'http://it2810-38.idi.ntnu.no:4000/', (req) => {
        aliasQuery(req,'GetMoviesQuery')
      })
  })
  it('should return filtered movies on both year and genre correctly', () => {
    cy.get('#dropdownSelectGenre').click();
    cy.get('[data-value="Drama"]').click();
    cy.get('#fromYear').type(2016);
    cy.get('#toYear').type(2018);
    cy.get("#applyFilter").click();
    const response= cy.wait(`@GetMoviesQuery`)
    .its('response.body.data.getMovies.movies');
    response.each((movie)=>{
      expect(parseInt(movie.year)).to.be.at.least(2016);
      expect(parseInt(movie.year)).to.be.at.most(2018);
      expect(movie.genres).to.include("Drama");
     });

     //Assert redux store is set correctly
     cy.window().its('store').invoke('getState').its('searchQueries').should("deep.equal",{
      "searchQueries":{
        fromYear: 2016,
        selectedGenre: "Drama",
        toYear: 2018}
    }
  )
  });
});