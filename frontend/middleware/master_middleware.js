import { applyMiddleware } from 'redux';

//Import Individual Middlewares
import GroupedBarMiddleware from './grouped_bar_middleware.js';

//Create Master Middleware
const masterMiddleware = applyMiddleware(
  GroupedBarMiddleware
);

export default masterMiddleware;
