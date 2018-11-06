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


class CartView extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleSubmit() {
    this.props.add(this.props.cart)
    this.props.changeInventory(this.props.cart)
    this.props.clearCart()
  }

  render() {
    const carts = this.props.cart
    const cartArr = [...carts]
    console.log("cartignlkagfj", cartArr[0])
    // let result = cartArr.map(a =>a.product.price*a.number).reduce(function (accumulator, currentValue) {
    //   return accumulator + currentValue;
    // }, 0);
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
          <div className="donut-title">
          Order Total: $
       {((this.props.cart
            .map(a => a.product.price * a.number)
            .reduce(function(accumulator, currentValue) {
              return accumulator + currentValue
            }, 0))/100).toFixed(2)}
           </div>


        </table>
        <div className="checkout">
          {this.props.isLoggedIn ? (
            <Checkout  name={'Donut Order'} handleSubmit={this.handleSubmit}
            description={'Yum Donuts'}
            amount={this.props.cart.map(a =>a.product.price*a.number).reduce(function (accumulator, currentValue) {
              return accumulator + currentValue;
            }, 0)}/>
          ) : (
          <Link to="/login" className="buttons"> Checkout </Link>


          )}
        </div>
      </div>
    ) : (
      <div className="cart top-padding">
        <p>No Items Yet!</p>
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
  connect(mapStateToProps, mapDispatchToProps)(CartView)
)
