const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Product = db.model('product')
const OrderProducts = db.model('orderProducts')

describe('Order model', () => {
  describe('Validations', () => {
    let newOrder
    beforeEach(() => {
      newOrder = Order.build()
    })

    it('should have an order status of "Created, Processing, Cancelled, or Completed', async () => {
      newOrder.orderStatus = 'Pending'

      try {
        await newOrder.validate()
        throw Error(
          'Trying to `save` a donut with invalid `order status` should have failed.'
        )
      } catch (err) {
        expect(err).to.exist
        expect(err.message).to.contain('isIn')
      }
    })
  })
  describe('hooks', () => {
    it('it logs creation date and time before saving to database', async () => {
      await Order.create({orderStatus: 'Created'})
      expect(Order.creationDateAndTime).to.not.equal(null)
    })
  })
  describe('associations', () => {
    it('creates an association between the user and order', async () => {
      const user = await User.create({
        email: 'candy@email.com',
        password: 'hellothere',
        address: '5 Hanover Square, New York, NY 10004'
      })

      const anotherOrder = await Order.create({orderStatus: 'Created'})
      await user.setOrders(anotherOrder)

      const userIdForOrder = await Order.findById(anotherOrder.id, {
        attributes: ['userId']
      })
      const orderUser = userIdForOrder.userId
      expect(orderUser).to.equal(user.id)
    })
    it('creates an association between order and product', async () => {
      const newProduct = await Product.create({
        title: 'Carrot Cake',
        description: 'Carrot cake in donut form',
        price: 500,
        inventory: 10,
        imageUrl: '/carrotcake.png',
        category: 'Holey-Donut'
      })
      const newOrderInfo = {
        quantity: 5,
        price: +300,
        userId: 1,
        productId: 1
      }
      const newOrder = await Order.create({orderStatus: 'Created'})
      await newOrder.addProduct(newOrderInfo.productId, {
        through: {
          price: newOrderInfo.price,
          quantity: newOrderInfo.quantity,
          subtotal: newOrderInfo.quantity * newOrderInfo.price
        }
      })
      await newOrder.getProducts()
      const idMatch = await OrderProducts.findAll({
        where: {
          orderId: newOrder.id
        }
      })
      expect(newOrder.id).to.equal(idMatch[0].orderId)
    })
    it('calculates the subtotal of each product that is ordered', async () => {
      const newProduct = await Product.create({
        title: 'Carrot Cake',
        description: 'Carrot cake in donut form',
        price: 500,
        inventory: 10,
        imageUrl: '/carrotcake.png',
        category: 'Holey-Donut'
      })
      const newOrderInfo = {
        quantity: 5,
        price: +300,
        userId: 1,
        productId: 1
      }
      const newOrder = await Order.create({orderStatus: 'Created'})
      await newOrder.addProduct(newOrderInfo.productId, {
        through: {
          price: newOrderInfo.price,
          quantity: newOrderInfo.quantity,
          subtotal: newOrderInfo.quantity * newOrderInfo.price
        }
      })
      await newOrder.getProducts()
      const idMatch = await OrderProducts.findAll({
        where: {
          orderId: newOrder.id
        }
      })
      const total = newOrderInfo.price * newOrderInfo.quantity
      const product = idMatch[0].subtotal
      expect(total).to.equal(product)
    })
  })
})
