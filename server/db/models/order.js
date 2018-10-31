const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    orderStatus: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['Created', 'Processing', 'Cancelled', 'Completed']]
      }
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    },
    creationDateAndTime: {
      type: Sequelize.DATE
    },
    subtotal: {
      type: Sequelize.INTEGER
    }
  },
  {
    hooks: {
      beforeCreate: order => {
        order.creationDateAndTime = new Date()
      }
    }
  }
)

const calculation = orderInstance => {
  orderInstance.subtotal = orderInstance.price * orderInstance.quantity
}

Order.beforeCreate(calculation)

module.exports = Order
