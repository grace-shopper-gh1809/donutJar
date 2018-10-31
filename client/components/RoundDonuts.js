import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

export class RoundDonuts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const allProducts = this.props.products || []
    const roundDonuts = allProducts.filter(product => {
      return product.category === 'Round'
    })
    return (
      <div>
        <div className="sides">
          <ul className="left-side">
            <h2 id="donut-header">Round Donuts</h2>
            {roundDonuts.map(product => {
              return (
                <div className="wrapper" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <div className="wrapper">
                      <img className="product-image" src={product.imageUrl} />
                      <div id="donut-title">
                        {product.title} ${(product.price / 100).toFixed(2)}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoundDonuts)
)
