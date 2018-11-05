import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {getCart, clearTheCart, updateInventory} from '../store/product'
import {addOrder, fetchOrders} from '../store/order'
import EditQuantity from './EditQuantity'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidMount() {
  //   this.props.getCart()
  // }

  handleSubmit() {}

  render() {
    const product = this.props.elem.product
    const elem = this.props.elem

    return (
      <tbody>
        <tr>
          <td>{product.id}</td>
          <td className="cart-title">
            <img src={product.imageUrl} className="cart-image" />
            {product.title}
          </td>
          <td>
            <EditQuantity product={product} />
          </td>
        </tr>
      </tbody>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     orders: state.orders.orders,
//     cart: state.products.cart,
//     products: state.products.products
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   add: order => dispatch(addOrder(order)),
//   getCart: () => dispatch(getCart()),
//   clearCart: () => dispatch(clearTheCart()),
//   changeInventory: cartItems => dispatch(updateInventory(cartItems))
// })

export default CartItem
// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(CartItem)
// )
