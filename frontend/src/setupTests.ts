// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import '@testing-library/jest-dom';
import { compose, createStore } from 'redux';
import allReducers from './redux';

// Send header to backend, set authroization to be the one stored at sessionStorage
export const authLink = setContext((_, { headers }) => {
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
  
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
  }
  
  // Set up redux store
export const store = createStore(allReducers,
    // This is just for getting access to the redux devtool in chrome
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
