import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'

class CartView extends React.Component {
  render() {
    return this.props.cart[0] ? (
      <table>
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
      'No Items Yet!'
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.products.cart
  }
}

export default withRouter(connect(mapStateToProps, null)(CartView))
