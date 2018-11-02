import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {getCart, clearCart, updateInventory} from '../store/product'

class CartView extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleSubmit() {
    this.props.changeInventory(this.props.cart)
    this.props.clearCart(this.props.cart)
  }
  render() {
    console.log(this.props.cart)
    return this.props.cart[0] ? (
      <div>
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
                  <td>{elem.product.title}</td>
                  <td>{elem.number}</td>
                </tr>
              </tbody>
            )
          })}
        </table>
        <button type="Submit" onClick={this.handleSubmit}>
          Checkout
        </button>
      </div>
    ) : (
      <div className="top-padding">
        <p>No Items Yet!</p>
        <button type="Submit" onClick={this.handleSubmit}>
          Checkout
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.products.cart,
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  clearCart: cart => dispatch(clearCart(cart)),
  changeInventory: cartItems => dispatch(updateInventory(cartItems))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartView)
)
