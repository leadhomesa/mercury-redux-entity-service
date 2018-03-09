import {
  LOAD_QUERY,
  LOAD_QUERY_SUCCESS,
  LOAD_BY_ID,
  LOAD_BY_ID_SUCCESS
} from './constants';

export const loadQuery = ({entityType, statusKey, query, queryUrl, transformToItems, getItemKey, validForSeconds}) => ({
  type: LOAD_QUERY,
  entityType,
  statusKey,
  query,
  queryUrl,
  transformToItems,
  getItemKey,
  validForSeconds
});

export const loadQuerySuccess = ({statusKey, content, transformToItems, getItemKey, entityType}) => ({
  type: LOAD_QUERY_SUCCESS,
  statusKey,
  content,
  transformToItems,
  getItemKey,
  entityType
});

export const loadById = ({id, entityUrl, entityType, transformToItems, getItemKey, statusKey, validForSeconds}) => ({
  type: LOAD_BY_ID,
  id,
  entityUrl,
  entityType,
  transformToItems,
  getItemKey,
  statusKey,
  validForSeconds
});

export const loadByIdSuccess = ({content, transformToItems, getItemKey, entityType}) => ({
  type: LOAD_BY_ID_SUCCESS,
  content,
  transformToItems,
  getItemKey,
  entityType
});
