const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.FLOAT,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
