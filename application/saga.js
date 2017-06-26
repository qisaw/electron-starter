import { takeEvery, put } from 'redux-saga/effects';
import { actions, actionTypes } from './actions';
const delay = ms => new Promise(res => setTimeout(res, ms))

function* incrementTimeout(action) {
  try {
    console.log('run');
    yield delay(3000);
    yield put(actions.increment())
  }
  catch (e) {
    console.log('fail', e);
  }
};

function* incrementSaga() {
  yield takeEvery(actionTypes.INCREMENT, incrementTimeout);
};

export default incrementSaga;
