import React from 'react'
import {StatelessOrderView} from './StatelessOrderView'
import axios from 'axios'

class OrderHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      orderHistory: []
    }
  }
  async componentDidMount() {
    const {data} = await axios.get('/api/users/orders')
    this.setState({
      orderHistory: data
    })
  }

  render() {
    console.log('order history', this.state.orderHistory)
    const historyObj = {}
    this.state.orderHistory.map(elem => {
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
      })
      historyObj[date]
    })
    return (
      <div className="top-padding">
        {Object.keys(historyObj).map((key, idx) => {
          const status = historyObj[key][0].status
          return (
            <div key={idx}>
              <div className="donut-title order-padding">
                {' '}
                {`Order Created: ${key}   Status: ${status}`}
              </div>
              <StatelessOrderView cart={historyObj[key]} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default OrderHistory
