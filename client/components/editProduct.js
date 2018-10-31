import React from 'react'
import {connect} from 'react-redux'
import {editProduct, selectProductById} from '../store/product'
import {withRouter} from 'react-router-dom'

const defaultState = {product: {}}

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
  //  this.state = defaultState

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  componentDidMount () {
      this.props.selectProductById(this.props.match.params.id)
  }

  async handleSubmit(e) {
    e.preventDefault()
    try{
    await this.props.editedProduct(
      this.props.match.params.id, this.state)
    } catch(err){
      console.log(err)
    }

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {title, description, price, inventory, imageUrl, category} =  {...this.props.selectedProduct}
console.log('title', title)
console.log('state', this.state)
    return (
      <div >
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" onChange={this.handleChange}>{title}</input>
        <label htmlFor="description">Description: </label>
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


const mapStateToProps = state => {
  return {
    selectedProduct: state.products.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editedProduct(product) {
      dispatch(editProduct(product))
    },
    selectProductById: id => dispatch(selectProductById(id))
  }
}

export default withRouter(
   connect(null, mapDispatchToProps)(EditProduct)
)
