import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProdAdmin} from '../store/product'

export class HoleyDonuts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const allProducts = this.props.products || []
    const holeyDonuts = allProducts.filter(product => {
      return product.category === 'Holey-Donut'
    })
    return (
      <div className="donut-container">
        <h2 className="donut-header">Holey Donuts</h2>

        <div className="sides">
          <ul className="left-side">
            {holeyDonuts.map(product => {
              return (
                <div className="wrapper" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <div className="wrapper">
                      <img className="product-image" src={product.imageUrl} />
                      <div className="donut-title">
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
  fetchProducts: () => dispatch(fetchProdAdmin())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HoleyDonuts)
)
