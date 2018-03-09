import {takeEvery, put, call, select} from 'redux-saga/effects';
import {
  LOAD_QUERY,
  LOAD_BY_ID
} from './constants';
import {
  loadQuerySuccess,
  loadByIdSuccess
} from './actions';
import {$get} from '@leadhome/query';
import * as status from '@leadhome/status';
import {getEntity} from './selectors';

function* onLoadQuery({entityType, statusKey, query, queryUrl, transformToItems, getItemKey, validForSeconds}) {
  try {
    const {isFetching, fetchedAt} = yield select(status.selectors.getStatus, statusKey);

    if(isFetching || !query)
      return;

    if(fetchedAt) {
      const expires = fetchedAt.getTime() + validForSeconds * 1000;

      if (new Date() < expires)
        return;
    }

    yield put(status.actions.fetch(statusKey));
    const content = yield call($get, queryUrl(query));
    yield put(loadQuerySuccess({statusKey, content, transformToItems, getItemKey, entityType}));
    yield put(status.actions.fetched(statusKey));
  }
  catch (e) {
    yield put(status.actions.error(statusKey, e.message));
  }
}

function* onLoadById({id, entityUrl, entityType, transformToItems, getItemKey, statusKey, validForSeconds}) {
  try {
    const {isFetching, fetchedAt} = yield select(status.selectors.getStatus, statusKey);

    if(isFetching)
      return;

    if(fetchedAt) {
      const expires = fetchedAt.getTime() + validForSeconds * 1000;

      if (new Date() < expires)
        return;
    }

    const existingItem = yield select(getEntity, entityType, id);
    if(existingItem)
      return;

    yield put(status.actions.fetch(statusKey));
    const content = yield call($get, entityUrl(id));
    yield put(loadByIdSuccess({content, transformToItems, getItemKey, entityType}));
    yield put(status.actions.fetched(statusKey));
  }
  catch (e) {
    yield put(status.actions.error(statusKey, e.message));
  }
}

function* all() {
  yield takeEvery(LOAD_QUERY, onLoadQuery);
  yield takeEvery(LOAD_BY_ID, onLoadById);
}

export default [
  all
];
