import React from 'react';
import ReactDOM from 'react-dom';
import App from './application';
import { AppContainer } from 'react-hot-loader';
import { Provider } from "react-redux";

import { isDevelopment } from './environment';
import configureStore from "./createStore";

const store = configureStore();

const wrapComponent = Component => {
  const connectedApp = (
    <Provider store={store}>
      <Component/>
    </Provider>
  );
  if(isDevelopment) {
    return (
      <AppContainer>
        {connectedApp}
      </AppContainer>
    );
  }
  return connectedApp;
}
const renderApp = Component => {
  ReactDOM.render( wrapComponent(Component), document.getElementById('root'));
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./application', () => {
    const NextApp = require('./application').default;
    renderApp(NextApp);
  });
}
