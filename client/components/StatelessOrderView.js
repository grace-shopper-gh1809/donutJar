import React from 'react'
export const StatelessOrderView = props => {
  return (
    <div className="cart order-padding">
      <table>
        <thead>
          <tr>
            <td>Item#</td>
            <td>Item Name</td>
            <td>Quantity</td>
          </tr>
        </thead>

        {props.cart.map((elem, idx) => {
          return (
            <tbody key={idx}>
              <tr>
                <td>{elem.product.id}</td>
                <td className="cart-title">
                  <img src={elem.product.imageUrl} className="cart-image" />
                  {elem.product.title}
                </td>
                <td>{elem.number}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

// import React from 'react'
// export const StatelessOrderView = props => {
//   const cart = props.cart
//   const product = {...cart}
//   const products = [...product.products]
//   console.log('cart instateless', products)
//   return (
//     <div className="cart order-padding">
//       <table>
//         <thead>
//           <tr>
//             <td>Item#</td>
//             <td>Item Name</td>
//             <td>Quantity</td>
//           </tr>
//         </thead>

//         {products.length ? (
//           products.map((product, idx) => {
//             return (
//               <tbody key={idx}>
//                 <tr>
//                   <td>{product.id}</td>
//                   <td className="cart-title">
//                     <img src={product.imageUrl} className="cart-image" />
//                     {product.title}
//                   </td>
//                   <td>{number}</td>
//                 </tr>
//               </tbody>
//             )
//           })
//         ) : (
//           <div>No product details</div>
//         )}
//       </table>
//     </div>
//   )
// }
