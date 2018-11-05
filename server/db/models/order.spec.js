const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')

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
  describe('user and order association', async () => {
    const user = await User.create({
      email: 'candy@email.com',
      password: 'hellothere',
      address: '5 Hanover Square, New York, NY 10004'
    })

    const anotherOrder = await Order.create({orderStatus: 'Created'})

    await user.setOrders(anotherOrder)
    console.log('yooooo', anotherOrder.userId)
    expect(await anotherOrder.getUser()).to.equal(user.id)
  })
})
