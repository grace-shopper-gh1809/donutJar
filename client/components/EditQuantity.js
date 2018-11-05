import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessSingleProduct} from './index'
import {getCart, clearTheCart, updateInventory} from '../store/product'
import {addOrder, fetchOrders} from '../store/order'

const EditQuantity = props => {
  // class EditQuantity extends React.Component {
  //   constructor(props) {
  //     super(props)
  //     this.handleSubmit = this.handleSubmit.bind(this)
  //   }

  //   componentDidMount() {}

  //   handleSubmit() {}
  // render() {
  const product = props.product
  console.log('porpdofjafj', props)
  const quantityyArray = Array(product.inventory)
    .fill()
    .map((item, idx) => idx + 1)

  return (
    <select name="number" className="custom-select">
      {quantityyArray.map((elem, idx) => {
        return (
          <option key={idx} value={elem}>
            {elem}
          </option>
        )
      })}
    </select>
  )
  // }
}

export default EditQuantity
