import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import {selectProductById, postReview} from '../store/product'

const defaultState = {
  content: '',
  rating: 3
}

export class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onStarClick = this.onStarClick.bind(this)
  }

  async handleSubmit (event) {
    event.preventDefault()
    try {
      await this.props.postReview(this.props.id, this.state)
      await this.props.selectProductById(this.props.id)
      this.setState(defaultState)
    } catch (err) {
      console.error(err)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }


  render() {
    const { rating } = this.state;
  return (
    <div className="reviewrating">
        <div className="reviewratingstar">Your Rating:</div>
        <StarRatingComponent
          name="rating"
          starCount={5}
          starColor='#590546'
          emptyStarColor='#16105136'
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
          className="reviewratingstar"
        />
    <div className="reviewform">
      <form onSubmit={this.handleSubmit}>
      <label htmlFor="content" className="reviewform">Your review:</label>
      <textarea type="text" name="content" onChange={this.handleChange} />
      <button type="submit" className="buttons">Submit</button>
      </form>
      </div>
    </div>
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
