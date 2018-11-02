import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {fetchOrders} from '../store/order'
import ProductList from './ProductList'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const products = this.props.products || []
    return (
      <div>
        <div className="sides">
          <div className="left-side">
            {products.length ? (
              <ProductList products={products} />
            ) : (
              <div>There are no donuts in the store</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.products.products,
  orders: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchAllOrders: () => dispatch(fetchOrders())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
