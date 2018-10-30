import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/product'

class addProduct extends React.Component {
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
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.addedProduct(this.state)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <form onSubmit={this.props.addedProduct}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" onChange={handleChange} />
        <label htmlFor="description">Description: </label>
        <input type="text" name="description" onChange={handleChange} />
        <label htmlFor="imageUrl">Image url: </label>
        <input type="text" name="imageUrl" onChange={handleChange} />
        <label htmlFor="price">Price: </label>
        <textarea type="text" name="price" onChange={handleChange} />
        <label htmlFor="inventory">Price: </label>
        <textarea type="text" name="inventory" onChange={handleChange} />
        <label htmlFor="category">Price: </label>
        <textarea type="text" name="category" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addedProduct(product) {
      dispatch(addProduct(product))
    }
  }
}

export default connect(null, mapDispatchToProps)(addProduct)
