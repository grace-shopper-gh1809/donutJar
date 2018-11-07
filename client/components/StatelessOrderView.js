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
