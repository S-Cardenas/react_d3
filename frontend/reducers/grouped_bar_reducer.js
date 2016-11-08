import { RECEIVE_GROUPED_BAR } from '../actions/bar_actions';

const GroupedBarReducer = (state = {}, action) => {
  let newState = {};
  switch(action.type) {
    case(RECEIVE_GROUPED_BAR):
      newState = action.groupedBar;
      return newState;
    default:
      return state;
  }
};

export default GroupedBarReducer;
