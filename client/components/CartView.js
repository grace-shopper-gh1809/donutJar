import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {getCart, clearCart, updateInventory} from '../store/product'
import {addOrder, fetchOrders} from '../store/order'

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
    this.props.clearCart([])
  }
  render() {
    console.log('the cart', this.props.cart)
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
            return (
              <tbody key={idx}>
                <tr>
                  <td>{elem.product.id}</td>
                  <td className="cart-title">
                    <img src={elem.product.imageUrl} className="cart-image" />
                    {elem.product.title}
                  </td>
                  <td>{elem.number}</td>
                </tr>
              </tbody>
            )
          })}
        </table>
        <div className="checkout">
          <button type="Submit" className="buttons" onClick={this.handleSubmit}>
            Checkout
          </button>
        </div>
      </div>
    ) : (
      <div className="cart top-padding">
        <p>No Items Yet!</p>
        <div className="checkout">
          <button type="Submit" className="buttons" onClick={this.handleSubmit}>
            Checkout
          </button>
        </div>
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
  clearCart: cart => dispatch(clearCart(cart)),
  changeInventory: cartItems => dispatch(updateInventory(cartItems))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartView)
)
