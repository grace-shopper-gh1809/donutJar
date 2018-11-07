import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectProductById, postReview} from '../store/product'
import StarRatingComponent from 'react-star-rating-component'

const Review = props => {
  const review = props.review
  return (
    <div>
      <li className="formratingstar">
        <StarRatingComponent
          name="disabled"
          editing={false}
          disabled={true}
          starCount={5}
          starColor="#590546"
          emptyStarColor="#16105136"
          value={review.rating}
          className="reviewratingstar"
        />
        <p className="form-reviewform">{review.content}</p>
      </li>
    </div>
  )
}

export default Review
