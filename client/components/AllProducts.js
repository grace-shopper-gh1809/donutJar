import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'




export class ProductList extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products || []
    return (
      <div>
        <h2>Donuts</h2>
        <div className="sides">

          <div className="left-side">
            {products.length ? <ProductList products={products} />
            : <div>There are no donuts in the store</div>}
          </div>

        </div>
      </div>
      )
  }
}
const mapStateToProps = (state) => ({
  products: state.products
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList))
