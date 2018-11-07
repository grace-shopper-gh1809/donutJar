import React from 'react'
import {Link} from 'react-router-dom'

const ProductList = props => {
  const products = props.products || []
  return (
    <div className="donut-container">
      <h2 className="donut-header">Donuts</h2>

      <div className="sides2">
        <ul className="left-side">
          {products.map(product => {
            return (
              <div className="wrapper" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="wrapper">
                    <img className="product-image" src={product.imageUrl} />
                    <div className="donut-title">
                      {product.title} ${(product.price / 100).toFixed(2)}
                      {!product.inventory ? (
                        <div className="donut-title">Out of Stock</div>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ProductList
