const router = require('express').Router()
const {Product, Review, User, Order, OrderProducts} = require('../db/models')

/////For all to see

router.get('/', async (req, res, next) => {
  try {
    const donuts = await Product.findAll()
    res.json(donuts)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', (req, res, next) => {
  try {
    req.session.cart ? res.json(req.session.cart) : res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const donut = await Product.findById(req.params.id, {
      include: [{model: Review, include: User}] //included User in the Review model
    })
    if (donut) {
      res.json(donut)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/////For users

router.post('/', (req, res, next) => {
  if (req.user.adminStatus) {
    Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      imageUrl: req.body.imageUrl,
      category: req.body.category
    })
      .then(newProduct => res.json(newProduct))
      .catch(err => next(err))
  } else {
    res.send('not an admin')
  }
})

// PUT /api/
router.put('/:id', async (req, res, next) => {
  if (req.user.adminStatus) {
    try {
      const id = +req.params.id
      const product = await Product.findById(id)
      const editedProd = await product.update(req.body)
      res.status(204)
      res.json(editedProd)
    } catch (err) {
      next(err)
    }
  } else {
    res.send('not an admin')
  }
})

//adding info to session store
router.post('/cart', (req, res, next) => {
  req.session.cart = req.body
  res.sendStatus(201)
})

router.delete('/cart/:id', (req, res, next) => {
  const id = +req.params.id
  const newCart = req.session.cart.filter(elem => elem.product.id !== id)
  req.session.cart = newCart
  res.sendStatus(201)
})

router.post('/cart/checkout', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const cart = req.session.cart

    const orderInfo = cart.map(product => {
      return {
        quantity: product.number,
        price: +product.product.price,
        userId: userId,
        productId: product.product.id
      }
    })
    const newItems = []
    const newOrderItem = await Order.create({userId: userId})
    // orderInfo.forEach(async (product, index) => {
    //   newItems.push(orderInfo[index])
    //   await newOrderItem.addProduct(orderInfo[index].productId, {
    //     through: {
    // price: orderInfo[index].price,
    // quantity: orderInfo[index].quantity,
    // subtotal: orderInfo[index].quantity * orderInfo[index].price
    //     }
    //   })
    // })
    let orderInforPromises = orderInfo.map((product, index) => {
      newItems.push(orderInfo[index])
      newOrderItem.addProduct(orderInfo[index].productId, {
        through: {
          price: orderInfo[index].price,
          quantity: orderInfo[index].quantity,
          subtotal: orderInfo[index].quantity * orderInfo[index].price
        }
      })
    })

    const newOrder = await Promise.all(orderInforPromises)

    req.session.cart = []
    res.send(newOrder)
  } catch (error) {
    next(error)
  }
})

router.put('/cart/checkout', (req, res, next) => {
  try {
    const cart = req.session.cart
    const changes = cart.map(async product => {
      const donut = await Product.findById(product.product.id)
      const newInventory = await donut.update({
        inventory: donut.inventory - product.number
      })
    })
    req.session.cart = []
    res.send(changes)
  } catch (error) {
    next(error)
  }
})

//post reviews
router.post('/:id', async (req, res, next) => {
  try {
    if (req.user.id) {
      const id = req.params.id
      const reviewPosted = await Review.build(req.body)
      reviewPosted.productId = id
      reviewPosted.userId = req.user.id
      await reviewPosted.save()
      console.log('thisis posted', reviewPosted)
      res.json(reviewPosted)
    }
  } catch (err) {
    next(err)
  }
})

// router.delete('/:id', (req, res, next) => {
//   if (req.user.adminStatus) {
//   Product.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(() => res.status(204).end())
//     .catch(err => next(err))
//   } else {
//     res.send("not an admin")
//   }
// })

module.exports = router
