import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectProductById, postReview} from '../store/product'

export class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit (event) {
    event.preventDefault()
    try {
      await this.props.postReview(this.props.id, this.state)
      await this.props.selectProductById(this.props.id)
    } catch (err) {
      console.error(err)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
  return (
    <form onSubmit={this.handleSubmit}>
    <label htmlFor="content">Your review:</label>
    <input name="content" type="text" onChange={this.handleChange}/>
    <button type="submit" className="buttons">submit</button>
    </form>
  )
  }
}

const mapDispatchToProps = dispatch => ({
  postReview: (id, review) => dispatch(postReview(id, review)),
  selectProductById: id => dispatch(selectProductById(id)),
})

export default withRouter(
  connect(null, mapDispatchToProps)(ReviewForm)
)
