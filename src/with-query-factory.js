import React from 'react';
import {connect} from 'react-redux';
import {loadQuery} from './actions';
import {getLoadQueryStatusKey} from "./constants";
import {getItems} from './selectors';
import * as status from '@leadhome/status';

export default ({entityType, queryUrl, transformToItems, getItemKey, validForSeconds}) => {
  class WithEntityQuery extends React.PureComponent {

    componentDidMount() {
      this.load({}, this.props);
    }

    componentWillReceiveProps(newProps) {
      this.load(this.props, newProps);
    }

    load = ({statusKey: oldStatusKey}, {statusKey, loadQuery, disabled, query}) => {
      if (disabled)
        return;

      if (oldStatusKey !== statusKey)
        loadQuery({
          entityType,
          statusKey,
          query,
          queryUrl,
          transformToItems,
          getItemKey,
          validForSeconds
        });
    };

    render() {
      const {render, children, items, loadStatus} = this.props;

      return (render || children)({
        items,
        loadStatus
      });
    }
  }

  return connect(
    (state, {query}) => {
      const statusKey = getLoadQueryStatusKey(entityType, query);
      return {
        statusKey,
        items: getItems(state, entityType, statusKey),
        loadStatus: status.selectors.getStatus(state, statusKey)
      };
    },
    {
      loadQuery,
    }
  )(WithEntityQuery);
}
