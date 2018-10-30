import React from 'react'
import {Link} from 'react-router-dom'


const ProductList = (props) => {

    const products = props.products || []
    console.log("STUD", products)
    return (
      <div>
        <h2>Donuts</h2>
        <div className="sides">
        <ul className="wrap">
         { products.map(product => {
            return (
                <div className="wrapper" key={product.id}>
                  <Link to={`/products/${product.id}`} >
                    <p>{product.title}</p>
                    <p>{product.imageUrl}</p>
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

