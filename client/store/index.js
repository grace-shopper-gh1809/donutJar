import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer} from './product'
import user from './user'
import {orderReducer} from './order'
import {reviewReducer} from './review'

const reducer = combineReducers({
  products: productReducer,
  orders: orderReducer,
  users: user,
  reviews: reviewReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './product'
export * from './user'
export * from './order'
export * from './review'
