/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  describe('Validations', () => {
    let newProduct
    beforeEach(() => {
      newProduct = Product.build()
    })

    it('should require title', async () => {
      try {
        await newProduct.validate()
        throw new Error(
          'validation was successful but should have failed without `title`'
        )
      } catch (error) {
        expect(error.message).to.contain('title cannot be null')
      }
    })

    it('can handle a long `description`', async () => {
      let donutDescription =
        'Traditional carrot cake with lots of fresh carrots, raisins, walnuts & spices in the dough and a cream cheese filling and glaze and sprinkled with carrots and walnuts.'

      newProduct.title = 'Carrot Cake'
      newProduct.description = donutDescription

      expect(newProduct).to.be.an('object')
      expect(newProduct.title).to.equal('Carrot Cake')
      expect(newProduct.description).to.equal(donutDescription)
    })

    it('should require price', async () => {
      try {
        await newProduct.validate()
        throw new Error(
          'validation was successful but should have failed without `price`'
        )
      } catch (error) {
        expect(error.message).to.contain('price cannot be null')
      }
    })
    it('should require inventory', async () => {
      try {
        await newProduct.validate()
        throw new Error(
          'validation was successful but should have failed without `inventory`'
        )
      } catch (error) {
        expect(error.message).to.contain('inventory cannot be null')
      }
    })

    it('should have a category property of only "Round" or "Holey-Donut"', async () => {
      let donutDescription =
        'Traditional carrot cake with lots of fresh carrots, raisins, walnuts & spices in the dough and a cream cheese filling and glaze and sprinkled with carrots and walnuts.'

      newProduct.title = 'Carrot Cake'
      newProduct.description = donutDescription
      newProduct.price = 350
      newProduct.inventory = 15

      await newProduct.save()
      newProduct.category = 'Round'
      await newProduct.save()
      newProduct.category = 'Holey-Donut'

      try {
        newProduct.category = 'Square'
        await newProduct.save()
      } catch (err) {
        expect(err).to.exist
        expect(err.message).to.contain('category')
        return // everything is fine, so stop this spec.
      }
      throw Error(
        'Trying to `save` a donut with invalid `category` should have failed.'
      )
    })
  })
})
