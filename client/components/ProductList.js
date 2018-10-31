import React from 'react'
import {Link} from 'react-router-dom'


const ProductList = (props) => {

    const products = props.products || []
    return (
      <div>
        <h2>Donuts</h2>
        <div className="sides">
        <ul className="wrap">
         { products.map(product => {
            return (
                <div className="wrapper" key={product.id}>
                  <Link to={`/products/${product.id}`} >
                  <img className="product-image" src={product.imageUrl} />
                  <div id="donut-title">{product.title} ${product.price}</div>
                  </Link>
                </div>
            )
          })
        }
        </ul>
        </div>
      </div>
      )
  }



export default ProductList

