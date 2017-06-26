import rootSaga from './rootSaga';
import { isDevelopment } from "../environment";

import { take, fork, cancel } from 'redux-saga/effects';

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

// @TODO need to attempt a pause and resume instead of just stop and start
const createAbortableSaga = saga => {
  if (isDevelopment) {
    return function* main () {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  } else {
    return saga;
  }
}

const sagaManager = {
  startSagas(sagaMiddleware) {
    rootSaga.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },
  cancelSagas(store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  }
};

export default sagaManager;
