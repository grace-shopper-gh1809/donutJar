import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const POST_PRODUCT = 'POST_PRODUCT'
const PUT_PRODUCT = 'PUT_PRODUCT'
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

const putProduct = product => ({
  type: PUT_PRODUCT,
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

export const editProduct = (id, product) => async dispatch => {
  try {
    const {data: edited} = await axios.put(`/api/products/${id}`, product)
    dispatch(putProduct(edited))
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
      return {...state, products: [...state.products, action.product]}
    case PUT_PRODUCT:
      const productUpdated = state.products.map(
        product =>
          product !== action.product ? product : {...product, ...action.product}
      )
      return {...state, products: productUpdated}
    case SELECT_PRODUCT:
      return {...state, selectedProduct: action.product}
    case ADD_TO_CART:
      let cartCopy = [...state.cart]
      let newProduct = true
      cartCopy.map(elem => {
        if (elem.product.id === action.item.product.id) {
          elem.number += action.item.number
          newProduct = false
        }
      })
      if (newProduct) {
        return {...state, cart: [...cartCopy, action.item]}
      } else {
        return {...state, cart: [...cartCopy]}
      }

    default:
      return state
  }
}
