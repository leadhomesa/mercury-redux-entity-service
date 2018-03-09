import WithEntityFactory from './with-entity-factory';
import WithQueryFactory from './with-query-factory';

const EntityFactory = ({entityType, queryUrl, entityUrl, transformToItems, getItemKey, validForSeconds}) => {

  const WithEntity = WithEntityFactory({
    entityType,
    entityUrl,
    transformToItems,
    getItemKey,
    validForSeconds
  });

  const WithQuery = WithQueryFactory({
    entityType,
    queryUrl,
    transformToItems,
    getItemKey,
    validForSeconds
  });

  return {
    WithEntity,
    WithQuery
  };
};

export default EntityFactory;
