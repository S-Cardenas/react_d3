export const RECEIVE_GROUPED_BAR = 'RECEIVE_GROUPED_BAR';
export const REQUEST_GROUPED_BAR = 'REQUEST_GROUPED_BAR';

export const receiveGroupedBar = (groupedBar) => ({
  type: RECEIVE_GROUPED_BAR,
  groupedBar
});
