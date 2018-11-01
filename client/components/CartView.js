import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {getCart} from '../store/product'

class CartView extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    return this.props.cart[0] ? (
      <table className="top-padding">
        <thead>
          <tr>
            <td>Item#</td>
            <td>Item Name</td>
            <td>Quantity</td>
          </tr>
        </thead>

        {this.props.cart.map((elem, idx) => {
          return (
            <tbody key={idx}>
              <tr>
                <td>{elem.product.id}</td>
                <td>{elem.product.title}</td>
                <td>{elem.number}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    ) : (
      <div className="top-padding">No Items Yet!</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.products.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartView))
