import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectProductById} from '../store/product'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.selectProductById(this.props.match.params.id)
  }

  render() {
    const {title, description, price, inventory, imageUrl, category} = {
      ...this.props.selectedProduct
    }
    const review = {...this.props.selectedProduct.review}
    console.log('review.content', review.content)
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
        <button>Add to Cart</button>
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
  selectProductById: id => dispatch(selectProductById(id))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
