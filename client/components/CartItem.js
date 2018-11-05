import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {
  getCart,
  postToCart,
  clearTheCart,
  updateInventory,
  editCartQuantity
} from '../store/product'
import {addOrder, fetchOrders} from '../store/order'
// import EditQuantity from './EditQuantity'

// let item ={
//   number: '',
//   product: {}
// }
class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleSubmit(e) {
    e.preventDefault()
    const item = {
      number: +e.target.number.value,
      product: this.props.selectedProduct
    }
    this.props.postToCart(this.props.cart)
  }

  async handleChange(e) {
    const item = {
      number: +e.target.value,
      product: this.props.elem.product
    }
    await this.props.editCart(this.props.elem.product.id, item.number)
  }

  render() {
    const product = this.props.elem.product
    const elem = this.props.elem
    const quantityyArray = Array(product.inventory)
      .fill()
      .map((item, idx) => idx + 1)

    return (
      <tbody>
        <tr>
          <td>{product.id}</td>
          <td>
            <img src={product.imageUrl} className="cart-image" />
            {product.title}
          </td>
          <td>
            <form onSubmit={this.handleSubmit} className="cart-form">
              <select
                name="number"
                className="custom-select"
                onChange={this.handleChange}
              >
                <option>{elem.number}</option>
                {quantityyArray.map((item, idx) => {
                  return (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
              <button type="submit" className="buttons">
                Update
              </button>
            </form>
            {/* <EditQuantity
              product={product}
              elem={elem}
              // handleSubmit={this.handleChange}
            /> */}
            {/* <button>Update</button>
            {elem.number} */}
          </td>
        </tr>
      </tbody>
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
  getCart: () => dispatch(getCart()),
  addCartItem: item => dispatch(addCartItem(item)),
  postToCart: cart => dispatch(postToCart(cart)),
  editCart: (id, quantity) => dispatch(editCartQuantity(id, quantity))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartItem)
)

// export default CartItem
