import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectProductById, addCartItem} from '../store/product'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.submitHandler = this.submitHandler.bind(this)
  }
  componentDidMount() {
    this.props.selectProductById(this.props.match.params.id)
  }
  submitHandler(e) {
    e.preventDefault()
    const item = {
      number: e.target.number.value,
      product: this.props.selectedProduct
    }
    this.props.addCartItem(item)
  }

  render() {
    const {title, description, price, inventory, imageUrl, category} = {
      ...this.props.selectedProduct
    }
    const inventoryArray = Array(inventory)
      .fill()
      .map((item, idx) => idx + 1)

    const review = {...this.props.selectedProduct.review}
    return (
      <div className="single-product">
        <h2>{title}</h2>
        <img id="single-donut" src={imageUrl} />
        <p>${price}</p>
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
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.products.selectedProduct
  }
}

const mapDispatchToProps = dispatch => ({
  selectProductById: id => dispatch(selectProductById(id)),
  addCartItem: item => dispatch(addCartItem(item))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
