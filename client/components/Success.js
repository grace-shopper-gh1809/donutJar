import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {
  getCart,
  clearTheCart,
  updateInventory,
  editCartQuantity
} from '../store/product'
import {addOrder, fetchOrders} from '../store/order'
import CartItem from './CartItem'
import Checkout from './Checkout'

class Success extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getCart()
    this.props.add(this.props.cart)
    this.props.changeInventory(this.props.cart)
    this.props.clearCart()
  }

  render() {
    console.log('success i am success')
    return (
      <div className="cart">
        <table className="top-padding">
        <p>Thank you for your purchase</p>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    cart: state.products.cart,
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => ({
  add: order => dispatch(addOrder(order)),
  getCart: () => dispatch(getCart()),
  clearCart: () => dispatch(clearTheCart()),
  changeInventory: cartItems => dispatch(updateInventory(cartItems)),
  editCart: (id, quantity) => dispatch(editCartQuantity(id, quantity))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Success)
)
