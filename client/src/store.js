import { compose, applyMiddleware, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

// import cart from './reducers/cart';
// import catalog from './reducers/catalog';
// const reducer = {
//   cart,
//   catalog,
// };
// import reducer from './reducers';
import reducer from './reducers';
// const reducer = require('./reducers');

const middleware = applyMiddleware(promise(), thunk, createLogger());

let store = compose(
  autoRehydrate()
)(createStore)(reducer, middleware);

// persistStore(store);


export default store;