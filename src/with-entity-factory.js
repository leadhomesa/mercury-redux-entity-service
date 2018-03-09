import React from 'react';
import {connect} from 'react-redux';
import {loadById} from './actions';
import {getEntity} from './selectors';
import {getLoadByIdStatusKey} from './constants';
import * as status from '@leadhome/status';

export default ({entityType, entityUrl, transformToItems, getItemKey, validForSeconds}) => {
  class WithEntity extends React.Component {

    componentDidMount() {
      this.load({}, this.props);
    }

    componentWillReceiveProps(newProps) {
      this.load(this.props, newProps);
    }

    load = ({id: oldId}, {id, disabled, statusKey, loadById}) => {
      if (disabled)
        return;

      if (id !== oldId)
        loadById({
          id,
          entityUrl,
          entityType,
          transformToItems,
          getItemKey,
          statusKey,
          validForSeconds
        });
    };

    render() {
      const {render, children, entity, loadStatus} = this.props;

      return (render || children)({
        entity,
        loadStatus
      });
    }
  }

  return connect(
    (state, {id}) => {
      const statusKey = getLoadByIdStatusKey(entityType, id);
      return {
        statusKey,
        entity: getEntity(state, entityType, id),
        loadStatus: status.selectors.getStatus(state, statusKey)
      };
    },
    {
      loadById,
    }
  )(WithEntity);
};
