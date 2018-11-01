import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectProductById, addCartItem, postToCart} from '../store/product'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.submitHandler = this.submitHandler.bind(this)
  }
  componentDidMount() {
    this.props.selectProductById(this.props.match.params.id)
  }
  async submitHandler(e) {
    e.preventDefault()
    const item = {
      number: +e.target.number.value,
      product: this.props.selectedProduct
    }
    await this.props.addCartItem(item)
    this.props.postToCart(this.props.cart)
  }

  render() {
    const {title, description, price, inventory, imageUrl} = {
      ...this.props.selectedProduct
    }
    const inventoryArray = Array(inventory)
      .fill()
      .map((item, idx) => idx + 1)

    const review = {...this.props.selectedProduct.review}
    return (
      <div className="container">
        <ul className="single-product">
          <p />
          <h3 className="single-product-title">{title}</h3>
          <img id="single-donut" src={imageUrl} />
          <p>${(price / 100).toFixed(2)}</p>
          <p>{description}</p>
          <h3>Review</h3>
          {!review.rating || !review.content ? (
            <div>There are currently no reviews </div>
          ) : (
            <div>
              <p>Rating: {review.rating}</p>
              <p>{review.content}</p>{' '}
            </div>
          )}
          <form onSubmit={this.submitHandler}>
            <select name="number">
              {inventoryArray.map((elem, idx) => {
                return (
                  <option key={idx} value={elem}>
                    {elem}
                  </option>
                )
              })}
            </select>
            <button>Add to Cart</button>
            {this.props.admin && (
              <h2>
                <Link
                  to={`/products/${this.props.selectedProduct.id}/editProduct`}
                >
                  Edit
                </Link>
              </h2>
            )}
          </form>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.products.selectedProduct,
    admin: state.users.user.adminStatus,
    cart: state.products.cart
  }
}

const mapDispatchToProps = dispatch => ({
  selectProductById: id => dispatch(selectProductById(id)),
  addCartItem: item => dispatch(addCartItem(item)),
  postToCart: cart => dispatch(postToCart(cart))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
