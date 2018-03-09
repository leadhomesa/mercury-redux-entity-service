export const DOMAIN = '@@ENTITY';

export const LOAD_QUERY = `${DOMAIN}/load-query`;
export const LOAD_QUERY_SUCCESS = `${DOMAIN}/load-query-success`;
export const getLoadQueryStatusKey = (entityType, query) => `${entityType.toUpperCase()}___${DOMAIN}/load-query___${JSON.stringify(query)}`;


export const LOAD_BY_ID = `${DOMAIN}/load-by-id`;
export const LOAD_BY_ID_SUCCESS = `${DOMAIN}/load-by-id-success`;
export const getLoadByIdStatusKey = (entityType, id) => `${entityType.toUpperCase()}___${DOMAIN}/load-by-id___${id}`;
