import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppShell from '@bufferapp/app-shell';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://graph.local.buffer.com',
    credentials: 'include',
  })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppShell
        user={{
          menuItems: [] }}
        content={<App />}
      >
      </AppShell>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
