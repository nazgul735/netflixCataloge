import { render } from "@testing-library/react";
import App from "../../src/App";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import allReducers from '../redux';
import {createStore, compose} from 'redux'; 
import {Provider} from 'react-redux';
import { setContext } from '@apollo/client/link/context';

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
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

// Set up redux store
const store = createStore(allReducers,
  // This is just for getting access to the redux devtool in chrome
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

test("it renders without crashing", () => {
  const divTest = document.createElement("div");
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
        <App />
        </Router>
      </Provider>
    </ApolloProvider>
,divTest
  );
  ReactDOM.unmountComponentAtNode(divTest);
});