import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth';
import repositories from './repositories';
import repository from './repository';

export default function() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunk));

  return createStore(combineReducers({
    auth,
    repositories,
    repository
  }), enhancer);
};
