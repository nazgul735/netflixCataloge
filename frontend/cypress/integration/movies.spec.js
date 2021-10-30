import { aliasQuery} from '../utils/graphql-test-utils';
describe('When landing page is loading', () => {
     beforeEach(() => {
         cy.visit('http://localhost:3000/');
         cy.clearLocalStorage();
         cy.intercept('POST', 'http://it2810-38.idi.ntnu.no:4000/', (req) => {
             //Set up aliases
            aliasQuery(req,'GetMoviesQuery');
          })
     })

      it('appbar should have a title', () => {
        cy.contains('Movie database');
    })

    it('all movies should load by default together with pagination', () => {
        cy.reload();
        const movies = cy.wait(`@GetMoviesQuery`)
        .its('response.body.data.getMovies.movies');
        movies.should("have.length",12);
        movies.each((movie)=>{
            //Check if the title of movies are displayed in DOM
            cy.contains(movie.title);
           });
        cy.get(".pagination").should("exist");
        //Testing initial state when loading page, search query is not applied and should be undefined, page should default to 1
        cy.window().its('store').invoke('getState').should("deep.equal",{
            "isLoggedIn": false,
            "page":{"payload":1},
            "searchQueries":{
                "searchQueries":{
                "fromYear": undefined,
                "searchString": undefined,
                "selectedGenre": undefined,
                "toYear": undefined}
              }
            })
        cy.get(".pagination").click();
        cy.wait(5000); 
        //Testing redux store is updated, this means that pagination works
        cy.window().its('store').invoke('getState').its('page').should("contain",{"payload":4})
        cy.window().its('store').invoke('getState').should("deep.equal",{
            "isLoggedIn": false,
            "page":{"payload":4},
            "searchQueries":{
                "searchQueries":{
                "fromYear": undefined,
                "searchString": undefined,
                "selectedGenre": undefined,
                "toYear": undefined}
              }
            })
      })
});

describe('When detailed view is loading', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.clearLocalStorage();
        cy.intercept('POST', 'http://it2810-38.idi.ntnu.no:4000/', (req) => {
           aliasQuery(req,'QuerySingleMovie');
         })
    })

   it('detailedMovies component should load with correct data', () =>{
       cy.wait(300);
       cy.contains('Learn More').first().click();
       cy.wait(`@QuerySingleMovie`)
        .its('response.body.data.getMovieByID.title')
        .should('eq',"Game Night").and('exist')
   })


});

