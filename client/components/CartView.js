import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {
  getCart,
  clearTheCart,
  updateInventory,
  editCartQuantity,
  editCartPromo
} from '../store/product'
import {addOrder, fetchOrders} from '../store/order'
import CartItem from './CartItem'
import Checkout from './Checkout'
let promoCode = {}
let counter = true
class CartView extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.applyCode = this.applyCode.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleSubmit() {
    this.props.add(this.props.cart)
    this.props.changeInventory(this.props.cart)
    this.props.clearCart()
    this.props.fetchOrders()
    counter = true
  }
  handleChange(e) {
    promoCode = {
      promoCode: e.target.value
    }
  }

  async applyCode() {
    try {
      if (
        counter &&
        promoCode.promoCode.toLowerCase() === this.props.user.promoCode
      ) {
        let promiseArr = this.props.cart.map(item => {
          return this.props.editPromo(item.product.id, 85)
        })

        await Promise.all(promiseArr)
        counter = false
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const carts = this.props.cart
    const cartArr = [...carts]

    // let result = cartArr.map(a =>a.product.price*a.number).reduce(function (accumulator, currentValue) {
    //   return accumulator + currentValue;
    // }, 0);
    return this.props.cart[0] ? (
      <div>
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
              {(
                this.props.cart
                  .map(
                    a =>
                      a.product.price *
                      a.number *
                      (a.product.promo ? a.product.promo / 100 : 1)
                  )
                  .reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue
                  }, 0) / 100
              ).toFixed(2)}
            </div>
          </table>

          <div className="checkout">
            {this.props.isLoggedIn ? (
              <div>
                <Checkout
                  name={'Donut Order'}
                  handleSubmit={this.handleSubmit}
                  description={'Yum Donuts'}
                  amount={this.props.cart
                    .map(
                      a =>
                        a.product.price *
                        a.number *
                        (a.product.promo ? a.product.promo / 100 : 1)
                    )
                    .reduce(function(accumulator, currentValue) {
                      return accumulator + currentValue
                    }, 0)}
                />
                <Link
                  to="/orderHistory"
                  className="google buttons"
                  onClick={this.handleSubmit}
                >
                  Checkout
                </Link>
              </div>
            ) : (
              <Link to="/login" className="google buttons">
                {' '}
                Checkout{' '}
              </Link>
            )}
          </div>
        </div>
        <div className="donut-title">
          <label htmlFor="promoCode">Promo Code:</label>
          <input
            type="text"
            name="promoCode"
            className="textbox"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="google buttons"
            onClick={this.applyCode}
          >
            Apply
          </button>
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
    products: state.products.products,
    user: state.users.user
  }
}

const mapDispatchToProps = dispatch => ({
  add: order => dispatch(addOrder(order)),
  getCart: () => dispatch(getCart()),
  clearCart: () => dispatch(clearTheCart()),
  changeInventory: cartItems => dispatch(updateInventory(cartItems)),
  editCart: (id, quantity) => dispatch(editCartQuantity(id, quantity)),
  editPromo: (id, promo) => dispatch(editCartPromo(id, promo)),
  fetchOrders: () => dispatch(fetchOrders())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartView)
)
