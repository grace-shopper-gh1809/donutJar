const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Product = db.model('product')
const OrderProducts = db.model('orderProducts')

describe('Order Route:', () => {
  before(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return Promise.all([
      Order.truncate({cascade: true}),
      User.truncate({cascade: true})
    ])
  })

  describe('GET /orders', () => {
    it('responds with an array via JSON', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect('Content-Type', /json/)
        .expect(200)

      // res.body is the JSON return object
      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(0)
    })
    it('returns an order if there is one in the DB', async () => {
      const user = await User.create({
        email: 'candy@email.com',
        password: 'hellothere',
        address: '5 Hanover Square, New York, NY 10004'
      })

      const anotherOrder = await Order.create({orderStatus: 'Created'})
      await user.setOrders(anotherOrder)

      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body[0].orderStatus).to.equal('Created')
    })
    it('it will eagerly products associated with order', async () => {
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
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body[0].products[0].title).to.equal('Carrot Cake')
    })
  })
})
