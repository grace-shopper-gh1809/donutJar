import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

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
      <div>
        <div className="sides">
          <ul className="left-side">
            <h2 id="donut-header">Holey Donuts</h2>
            {holeyDonuts.map(product => {
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
  connect(mapStateToProps, mapDispatchToProps)(HoleyDonuts)
)
