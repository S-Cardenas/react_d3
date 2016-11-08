import { REQUEST_GROUPED_BAR } from '../actions/bar_actions';

import { fetchGroupedBar } from '../util/api_util.js';

export default ({ getState, dispatch }) => next => action => {


  switch( action.type ) {
    case REQUEST_GROUPED_BAR:

      break;
    default:
      next(action);
  }
};
