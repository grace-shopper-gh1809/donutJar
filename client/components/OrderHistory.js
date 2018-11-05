import React from 'react'
import {StatelessOrderView} from './StatelessOrderView'

export const OrderHistory = props => {
  //product.imageUrl
  //product.id
  //product.title
  //number
  const historyObj = {}
  console.log('hello;', props)

  props.orderHistory.map(elem => {
    const date = elem.createdAt
    elem.products.forEach(elem2 => {
      const product = {
        number: elem2.orderProducts.quantity,
        status: elem.orderStatus,
        product: {
          title: elem2.title,
          id: elem2.id,
          imageUrl: elem2.imageUrl
        }
      }
      if (!historyObj[date]) {
        historyObj[date] = [product]
      } else {
        historyObj[date].push(product)
      }
      console.log(elem2)
    })
    console.log('historyObj', historyObj, historyObj[date])
    historyObj[date]
  })

  return (
    <div>
      {Object.keys(historyObj).map((key, idx) => {
        const status = historyObj[key][0].status
        console.log(status)
        return (
          <div key={idx}>
            {`Order Created: ${key}   Status: ${status}`}
            <StatelessOrderView cart={historyObj[key]} />
          </div>
        )
      })}
    </div>
  )
}
