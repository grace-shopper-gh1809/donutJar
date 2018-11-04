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
        <input type="text" name="title" className="textbox" onChange={this.handleChange} placeholder={title}/>
        <label htmlFor="description">Description: </label>
        <textarea type="text" name="description" className="textbox" onChange={this.handleChange}  placeholder={description}/>
        <label htmlFor="imageUrl">Image url: </label>
        <input type="text" name="imageUrl" className="textbox" onChange={this.handleChange}  placeholder={imageUrl}/>
        <label htmlFor="price">Price: </label>
        <input type="text" name="price" className="textbox" onChange={this.handleChange} placeholder={price} />
        <label htmlFor="inventory">Quantity: </label>
        <input type="text" name="inventory" className="textbox" onChange={this.handleChange} placeholder={inventory} />
        <label htmlFor="category">Category (Holey-Donut or Round): </label>
        <input type="text" name="category" className="textbox" onChange={this.handleChange}  placeholder={category}/>
        <button type="submit" className="buttons">submit</button>
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
    editedProduct(id, product) {
      dispatch(editProduct(id, product))
    },
    selectProductById: id => dispatch(selectProductById(id))
  }
}

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(EditProduct)
)
