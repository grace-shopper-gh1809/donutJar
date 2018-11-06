const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Product = db.model('product')
const OrderProducts = db.model('orderProducts')

describe('Product Route:', () => {
  before(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return Promise.all([
      Order.truncate({cascade: true}),
      User.truncate({cascade: true}),
      Product.truncate({cascade: true}),
      OrderProducts.truncate({cascade: true})
    ])
  })

  describe('GET /products', () => {
    it('responds with an array via JSON', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200)

      // res.body is the JSON return object
      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(0)
    })
    it('returns a product if there is one in the database', async () => {
      await Product.create({
        title: 'Carrot Cake',
        description: 'Carrot cake in donut form',
        price: 500,
        inventory: 10,
        imageUrl: '/carrotcake.png',
        category: 'Holey-Donut'
      })
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body[0].title).to.equal('Carrot Cake')
      expect(res.body[0].description).to.equal('Carrot cake in donut form')
      expect(res.body[0].price).to.equal(500)
      expect(res.body[0].category).to.equal('Holey-Donut')
    })
    describe('GET /api/products/:id', () => {
      let newDonut

      beforeEach(async () => {
        const moreDonuts = [
          {
            title: 'Carrot Cake',
            description: 'Carrot cake in donut form',
            price: 500,
            inventory: 10,
            imageUrl: '/carrotcake.png',
            category: 'Holey-Donut'
          },
          {
            title: 'Cinnamon Ring',
            description: 'Cinnamon flavored donuts',
            price: 500,
            inventory: 10,
            imageUrl: '/cinnring.png',
            category: 'Holey-Donut'
          },
          {
            title: 'Apple Cider Donut',
            description: 'A fall favorite made with apples!',
            price: 350,
            inventory: 10,
            imageUrl: '/apple.png',
            category: 'Holey-Donut'
          }
        ].map(data => Product.create(data))

        const creatingDonut = await Promise.all(moreDonuts)
        newDonut = creatingDonut[1]
      })
      it('returns the JSON of the product based on the id', async () => {
        const res = await request(app)
          .get('/api/products/' + newDonut.id)
          .expect(200)

        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body)
        }
        expect(res.body.title).to.equal('Cinnamon Ring')
      })
      it('returns a 404 error if the ID does not exist', () => {
        return request(app)
          .get('/api/products/7614')
          .expect(404)
      })
    })
  })
})
