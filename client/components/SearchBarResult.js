import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

function upperCase(str) {
  return str.toUpperCase()
}
function fixTitle(str) {
  var firstLetterRx = /(^|\s)[a-z]/g
  return str.replace(firstLetterRx, upperCase)
}

export class SearchBarResults extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const allProducts = this.props.products || []
    const allLowerCase = allProducts.map(donut => {
      donut.title = donut.title.toLowerCase()
      return donut
    })
    const matchingDonuts = allLowerCase.filter(donut => {
      return donut.title.includes(this.props.searchInput.toLowerCase())
    })
    const presentedfilter = matchingDonuts.filter(donut => {
      donut.title = donut.title.toLowerCase()
      return donut
    })
    return (
      <div className="donut-container">
        <h2 className="donut-header">Search Results</h2>
        <div className="sides">
          <ul className="left-side">
            {presentedfilter.map(product => {
              return (
                <div className="wrapper" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <div className="wrapper">
                      <img className="product-image" src={product.imageUrl} />
                      <div className="donut-title">
                        {fixTitle(product.title)} ${(
                          product.price / 100
                        ).toFixed(2)}
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
  searchInput: state.products.searchInput,
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBarResults)
)
