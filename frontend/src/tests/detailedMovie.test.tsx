import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import DetailedMovie from "../pages/detailedMovie";
import allReducers from "../redux";

// Send header to backend, set authroization to be the one stored at sessionStorage
const authLink = setContext((_, { headers }) => {
    // get the jwt token from sessionStorage if it exists
    const token = sessionStorage.getItem('jwt');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const store = createStore(allReducers,
    // This is just for getting access to the redux devtool in chrome
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


describe("when detailedMovie renders", () => {
    it("should return the correct divs", () => {
        render(
            <ApolloProvider client={client}>
                <Provider store={store}>

                    <DetailedMovie />

                </Provider>
            </ApolloProvider>
        );
        expect(
            screen.findAllByLabelText("grid-container2")
        );
    })

})