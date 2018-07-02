import { combineReducers } from 'redux'
import cart from './cart'
import catalog from './catalog'

export default combineReducers({
  cart,
  catalog,
})
