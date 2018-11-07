import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer} from './product'
import user from './user'
import {orderReducer} from './order'

const reducer = combineReducers({
  products: productReducer,
  orders: orderReducer,
  users: user,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store =
  process.env.NODE_ENV === 'development'
    ? createStore(reducer, middleware)
    : createStore(reducer, applyMiddleware(thunkMiddleware))
export default store
export * from './product'
export * from './user'
export * from './order'

