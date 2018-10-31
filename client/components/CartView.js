import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'

const dummy = {
  id: 1,
  title: 'Birthday Batter',
  description: 'Doughtnut cake batter and sprinkles',
  price: '3',
  inventory: 5,
  imageUrl: '/Birthday-Batter.png',
  category: 'Round',
  createdAt: '2018-10-30T20:21:34.433Z',
  updatedAt: '2018-10-30T20:21:34.433Z',
  review: {
    id: 2,
    content: 'Delicious donuts!',
    rating: 5,
    createdAt: '2018-10-30T20:21:34.476Z',
    updatedAt: '2018-10-30T20:21:34.476Z',
    userId: 2,
    productId: 1
  }
}

class CartView extends React.Component {
  render() {
    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.products.cart
  }
}

export default withRouter(connect(mapStateToProps, null)(CartView))
