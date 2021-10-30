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
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
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
//Constructing link
const httpLink = createHttpLink({
  uri: 'http://it2810-38.idi.ntnu.no:4000/',
});

//set up for client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

//Enables using developer tools also in typescript
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

//Expose redux store if app is run in cypress
// @ts-ignore
if (window.Cypress){
  // @ts-ignore 
  window.store = store
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
