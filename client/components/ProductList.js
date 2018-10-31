import React from 'react'
import {Link} from 'react-router-dom'

const ProductList = props => {
  const products = props.products || []
  return (
    <div>
      <h2 id="donut-header">Donuts</h2>
      <div className="sides2">
        <ul className="wrap">
          {products.map(product => {
            return (
              <div className="wrapper" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="wrapper">
                    <img className="product-image" src={product.imageUrl} />
                    <div id="donut-title">
                      {product.title} ${product.price}
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
