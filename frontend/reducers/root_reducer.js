import { combineReducers } from 'redux';
import GroupedBarReducer from './grouped_bar_reducer';

const RootReducer = combineReducers({
  groupedBar: GroupedBarReducer
});

export default RootReducer;
