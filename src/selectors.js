import {DOMAIN} from './constants';
import * as status from '@leadhome/status';
import {fromJS} from "immutable";
import {createSelector} from 'reselect';

const getQuery = createSelector(
  (state, entityType, queryKey) => state[DOMAIN].getIn([entityType, 'query', queryKey]),
  query => query || fromJS([])
);

const getEntitySection = createSelector(
  (state, entityType) => state[DOMAIN].getIn([entityType, 'entity']),
  entity => entity || fromJS({})
);

export const getItems = createSelector(
  getQuery,
  getEntitySection,
  (items, entitySection) => items.map(id => entitySection.get(id)).toJS()
);

export const getEntity = createSelector(
  getEntitySection,
  (state, entityType, id) => id,
  (entitySection, id) => {
    const entity = entitySection.get(`${id}`);
    if(entity)
      return entity.toJS();
  }
);

export const getLoadStatus = (state, key) =>
  status.selectors.getStatus(state, key);
