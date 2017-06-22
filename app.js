import React from 'react';
import ReactDOM from 'react-dom';
import App from './application';
import { AppContainer } from 'react-hot-loader';
import { isDevelopment } from './environment';

const wrapComponent = Component => {
  if(isDevelopment) {
    return (
      <AppContainer>
        <Component/>
      </AppContainer>
    );
  }
  return <Component />;
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
