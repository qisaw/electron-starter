import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import sagaManager from "./sagaManager";

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
    )
  );

  sagaManager.startSagas(sagaMiddleware);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(require('./rootReducer').default);
    });
    module.hot.accept('./sagaManager', () => {
      sagaManager.cancelSagas(store);
      require('./sagaManager').default.startSagas(sagaMiddleware);
    });
  }
  return store;
}


export default configureStore;
