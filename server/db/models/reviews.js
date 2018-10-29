const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  content: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.FLOAT,
    validate: {
      isIn: {
        min: 1,
        max: 5
      }
    }
  }
})
