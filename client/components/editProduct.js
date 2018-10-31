import React from 'react'
import {connect} from 'react-redux'
import {editProduct} from '../store/product'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      imageUrl: '',
      price: '',
      inventory: '',
      category: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.editedProduct(this.state)
    // this.setState(
    //   {
    //     title: '',
    //     description: '',
    //     imageUrl: '',
    //     price: '',
    //     inventory: '',
    //     category: ''
    //   }
    // )
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (

      <div >
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" onChange={this.handleChange} />
        <label htmlFor="description">Description: </label>
        <input type="text" name="description" onChange={this.handleChange} />
        <label htmlFor="imageUrl">Image url: </label>
        <input type="text" name="imageUrl" onChange={this.handleChange} />
        <label htmlFor="price">Price: </label>
        <textarea type="text" name="price" onChange={this.handleChange} />
        <label htmlFor="inventory">Quantity: </label>
        <textarea type="text" name="inventory" onChange={this.handleChange} />
        <label htmlFor="category">Category (Holey-Donut or Round): </label>
        <textarea type="text" name="category" onChange={this.handleChange} />
        <button type="submit">submit</button>
      </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editedProduct(product) {
      dispatch(editProduct(product))
    }
  }
}

export default connect(null, mapDispatchToProps)(EditProduct)
