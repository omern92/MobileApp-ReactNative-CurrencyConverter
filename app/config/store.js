import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleWare from 'redux-saga';

import reducers from '../reducers';
import rootSaga from './sagas';

const sagaMiddleWare = createSagaMiddleWare();
const middleware = [sagaMiddleWare];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = createStore(reducers, applyMiddleware(...middleware));

sagaMiddleWare.run(rootSaga);

export default store;