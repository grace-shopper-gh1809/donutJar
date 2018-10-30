const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
  orderStatus: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['Created', 'Processing', 'Cancelled', 'Completed']]
      }
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  creationDateAndTime : {
    type: Sequelize.DATE
  }
},
  {
    hooks : {
      beforeCreate: (order) => {
          order.creationDateAndTime = new Date()
      }
    }
  })





module.exports = Order
