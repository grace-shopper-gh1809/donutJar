import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const POST_PRODUCT = "POST_PRODUCT";
/**
 * INITIAL STATE
 */
const initialState = {
  products: []

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
  product: product
})



/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      const action = getProducts(products)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const addProduct = (product) => {
  return async function(dispatch) {
    try {
      const added = axios.post('/api/products', product);
      dispatch(postProduct(added));
    } catch (error) {
      next(error)
    }
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
      return {...state, products: [...state.products,action.product]}
    default:
      return state
  }
}
