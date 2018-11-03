import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const POST_PRODUCT = 'POST_PRODUCT'
const PUT_PRODUCT = 'PUT_PRODUCT'
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
const SEARCH_PRODUCTS = 'SEARCH_PRODUCT'
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_INVENTORY_AFTER_CART = 'UPDATE_INVENTORY_AFTER_CART'
const POST_REVIEW = "POST_REVIEW"

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  selectedProduct: {},
  cart: [],
  searchInput: '',
  reviews: []
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

export const searchProducts = title => ({
  type: SEARCH_PRODUCTS,
  title
})

export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const clearTheCart = () => ({
  type: CLEAR_CART
})

export const updateInventoryAfterCart = cartItems => ({
  type: UPDATE_INVENTORY_AFTER_CART,
  cartItems
})

export const postAReview = (review) => ({
  type: POST_REVIEW,
  review,
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

export const postToCart = cart => async dispatch => {
  try {
    await axios.post('/api/products/cart', cart)
  } catch (err) {
    console.error(err)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get('/api/products/cart')
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const clearCart = cart => async dispatch => {
  try {
    const {data: cartToSave} = await axios.post(
      '/api/products/cart/checkout',
      cart
    )
    dispatch(clearTheCart())
  } catch (err) {
    console.error(err)
  }
}

export const updateInventory = cartItems => async dispatch => {
  try {
    const response = await axios.put('/api/products/cart/checkout')
    const {data} = response
    const action = getProducts(data)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

export const postReview = (id, reviews) => async(dispatch) => {
  try {
    const {data : review} = await axios.post(`/api/products/${id}`, reviews)
    dispatch(postAReview(review))
  } catch (err) {
    console.error(err)
  }
}
//when we hit button for add to cart
//add the item to cart session store
//add the updated cart to the session store
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

    case SEARCH_PRODUCTS:
      return {...state, searchInput: action.title}

    case GET_CART:
      return {...state, cart: [...action.cart]}
    case CLEAR_CART:
      return {...state, cart: []}
    case UPDATE_INVENTORY_AFTER_CART:
      const inventoryChange = state.products.map(product => {
        action.cartItems.map(cartItem => {
          if (cartItem.product.id === product.id) {
            product.inventory = product.inventory - cartItem.number
          }
        })
        return singleProduct
      })
      return {...state, products: inventoryChange}
      case POST_REVIEW:
      return {...state, reviews: [...state.reviews, action.review]}
    default:
      return state
  }
}
