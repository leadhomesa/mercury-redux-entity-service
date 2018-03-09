import {fromJS} from 'immutable';
import {handleActions} from 'redux-actions';
import {
  DOMAIN,
  LOAD_QUERY_SUCCESS,
  LOAD_BY_ID_SUCCESS
} from './constants';

const reducer = handleActions({

  [LOAD_QUERY_SUCCESS]: (state, {statusKey, content, transformToItems, getItemKey, entityType}) => {
    const items = transformToItems(content);
    const map = items.reduce((map, item) => ({
      ...map,
      [`${getItemKey(item)}`]: item
    }), {});
    const queryItems = items.map(item => `${getItemKey(item)}`);
    return state.mergeDeep({
      [entityType]: {
        entity: map,
        query: {
          [statusKey]: queryItems
        }
      }
    });
  },

  [LOAD_BY_ID_SUCCESS]: (state, {content, transformToItems, getItemKey, entityType}) => {
    const items = transformToItems(content);
    const map = items.reduce((map, item) => ({
      ...map,
      [`${getItemKey(item)}`]: item
    }), {});
    return state.mergeDeep({
      [entityType]: {
        entity: map
      }
    });
  }

}, fromJS({}));

export default {
  [DOMAIN]: reducer
};
