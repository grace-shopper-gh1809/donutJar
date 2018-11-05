import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REMOVE_USER = 'REMOVE_USER'
const DELETE_USER = 'DELETE_USER'
const GET_USER = 'GET_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const PROMOTE_USER = 'PROMOTE_USER'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'
/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  users: [],
  orderHistory: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const deleteUser = user => ({type: DELETE_USER, user})
const upgradeUser = user => ({type: PROMOTE_USER, user})

const getUsers = users => ({
  type: GET_ALL_USERS,
  users
})

const getOrderHistory = orders => ({
  type: GET_ORDER_HISTORY,
  orders
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUsers = () => async dispatch => {
  try {
    const response = await axios.get('/api/users')
    const users = response.data
    const action = getUsers(users)
    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    console.log(authError.response)
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const removingUser = id => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(() => dispatch(deleteUser(id)))
    .catch(err => console.error(`Removing user: ${id} unsuccessful`, err))
}

export const upgradingUser = id => dispatch => {
  axios
    .put(`/api/users/${id}`)
    .then(() => dispatch(upgradeUser(id)))
    .catch(err => console.error(`Promoting user: ${id} unsuccessful`, err))
}

export const fetchOrderHistory = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/orders')
    dispatch(getOrderHistory(data))
  } catch (error) {
    console.error('fetchOrderHistory did not work', error)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users: action.users}
    case GET_USER:
      return {...state, user: action.user}
    case PROMOTE_USER:
      const newList = [...state.users]
      const us = newList.find(user => user.id === action.user)
      us.adminStatus = true
      return {...state, users: newList}
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter(user => user.id !== action.user)]
      }
    case REMOVE_USER:
      return defaultUser
    case GET_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.orders
      }
    default:
      return state
  }
}
