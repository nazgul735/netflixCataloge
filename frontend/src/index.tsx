import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import allReducers from './redux';
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
//Wrap the whole application inside apollo clien provider and provider from react-redux
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
