import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import {selectProductById, addCartItem, postToCart} from '../store/product'
import ReviewForm from './ReviewForm'
import Review from './review.js'

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
    const selectProd = {...this.props.selectedProduct}
    const id = this.props.match.params.id
    const inventoryArray = Array(inventory)
      .fill()
      .map((item, idx) => idx + 1)

    const reviews = selectProd.reviews || []
    let averageReview = 0;
    reviews.forEach(review => {averageReview += review.rating})
    averageReview = reviews.length ? averageReview/reviews.length : 1
    return (
      <div className="container">
        <ul className="single-product">
          <p />
          <h3 className="single-product-title">{title}</h3>
          <img id="single-donut" src={imageUrl} />
          <p>${(price / 100).toFixed(2)}</p>
          <p>{description}</p>

          <form onSubmit={this.submitHandler}>
            <select name="number" className="custom-select">
              {inventoryArray.map((elem, idx) => {
                return (
                  <option key={idx} value={elem}>
                    {elem}
                  </option>
                )
              })}
            </select>
            <button className="google buttons">Add to Cart</button>
            {this.props.admin && (
              <h2>
                <Link
                  to={`/products/${this.props.selectedProduct.id}/editProduct`}
                  className="google buttons">
                  Edit
                </Link>
              </h2>
            )}
          </form>
          <h3>Reviews</h3>
          {!reviews.length ? (
            <div>There are currently no reviews </div>
          ) : (
            <div >
              <div>
              <p className="reviewrating">Average Rating:</p>
              <p className="reviewratingstar"><StarRatingComponent
                  name="disabled"
                  editing={false}
                  disabled={true}
                  starCount={5}
                  starColor='#590546'
                  emptyStarColor='#16105136'
                  value={averageReview}
                /></p>
                </div>
              <ul className="reviewratingform">
            {reviews.map(review => {
             return (
             <Review key={review.id} review={review} /> )
            })}
            </ul>
            </div>
          )}
           <ReviewForm id={id}/>
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
  postToCart: cart => dispatch(postToCart(cart)),
  //postReview: (id, review) => dispatch(postReview(id, review))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
