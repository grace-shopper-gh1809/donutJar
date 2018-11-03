const db = require('../db')
const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, {through: 'OrderProduct'})
Product.belongsToMany(Order, {through: 'OrderProduct'})

Review.belongsTo(User)

Review.belongsTo(Product)
Product.hasMany(Review)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *Another edit
 *    BlogPost.belongsTo(User)
 * We have to add more models.
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  Order,
  User,
  Product,
  Review
}
