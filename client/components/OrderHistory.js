import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {StatelessOrderView} from './StatelessOrderView'
import {fetchOrders} from '../store/order'

class OrderHistory extends React.Component {
  // constructor() {
  //   super()
  // }
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    console.log('ordred', this.props.orders)
    // const historyObj = {}
    // this.state.orderHistory.map(elem => {
    //   const date = elem.createdAt
    //   elem.products.forEach(elem2 => {
    //     const product = {
    //       number: elem2.orderProducts.quantity,
    //       status: elem.orderStatus,
    //       product: {
    //         title: elem2.title,
    //         id: elem2.id,
    //         imageUrl: elem2.imageUrl
    //       }
    //     }
    //     if (!historyObj[date]) {
    //       historyObj[date] = [product]
    //     } else {
    //       historyObj[date].push(product)
    //     }
    //   })
    // historyObj[date]
    // })
    return (
      <div className="top-padding">
        {/* {Object.keys(historyObj).map((key, idx) => {
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
        })} */}
      </div>
    )
  }
}
const mapsStateToProps = state => ({
  ordres: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders)
})

export default withRouter(
  connect(mapsStateToProps, mapDispatchToProps)(OrderHistory)
)
