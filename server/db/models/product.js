const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/favicon.ico'
  },
  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Round', 'Holey-Donut']]
    }
  }
})

Product.prototype.inventoryUpdate = soldItem => {
  this.inventory = this.inventory - soldItem
}

module.exports = Product
