import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const POST_PRODUCT = 'POST_PRODUCT'
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  selectedProduct: {},
  cart: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const postProduct = product => ({
  type: POST_PRODUCT,
  product
})

const selectProd = product => ({
  type: SELECT_PRODUCT,
  product: product
})

export const addCartItem = item => ({
  type: ADD_TO_CART,
  item
})
/**
 * THUNK CREATORS
 */

export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/products')
    const products = response.data
    const action = getProducts(products)
    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}

export const addProduct = product => async dispatch => {
  try {
    const {data: added} = await axios.post('/api/products', product)
    dispatch(postProduct(added))
  } catch (error) {
    console.error(error)
  }
}

export const selectProductById = id => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${id}`)
    dispatch(selectProd(product))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product]
      }
    case SELECT_PRODUCT:
      return {...state, selectedProduct: action.product}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.item]}
    default:
      return state
  }
}
