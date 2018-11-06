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
    return this.props.cart[0] ? (
      <div className="cart">
        <table className="top-padding">
          <thead>
            <tr>
              <td>Item#</td>
              <td>Item Name</td>
              <td>Quantity</td>
            </tr>
          </thead>

          {this.props.cart.map((elem, idx) => {
            return <CartItem key={idx} elem={elem} />
          })}
        </table>
        <div className="checkout">
          {this.props.isLoggedIn ? (
           // <Link to="/orderHistory" onClick={this.handleSubmit} >   </Link>
            <Checkout  name={'Donut Order'} handleSubmit={this.handleSubmit}
            description={'Yum Donuts'}
            amount={1}/>
          ) : (
          <Link to="/login" className="buttons"> Checkout </Link>


          )}
        </div>
      </div>
    ) : (
      <div className="cart top-padding">
        <p>Thank you for your purchase</p>
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
