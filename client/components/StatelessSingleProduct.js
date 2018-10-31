import React from 'react'

export const StatelessSingleProduct = props => {
  return (
    <div className="single-product">
      <h2>{props.title}</h2>
      <img id="single-donut" src={props.imageUrl} />
      <p>${props.price}</p>
      <p>{props.description}</p>
      <h3>Review</h3>
      {!props.review.rating || !props.review.content ? (
        <div>There are currently no reviews </div>
      ) : (
        <div>
          <p>Rating: {props.review.rating}</p>
          <p>{props.review.content}</p>{' '}
        </div>
      )}
    </div>
  )
}
