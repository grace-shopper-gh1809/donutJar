const router = require('express').Router()
const {Product, Review, User} = require('../db/models')

/////For all to see

router.get('/', async (req, res, next) => {
  try {
    const donuts = await Product.findAll()
    res.json(donuts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const donut = await Product.findById(req.params.id, {
      include: [{model: Review}]
    })
    res.json(donut)
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
     const editedProd =  await product.update(
        // title: req.body.title,
        // description: req.body.description,
        // price: req.body.price,
        // inventory: req.body.inventory,
        // imageUrl: req.body.imageUrl,
        // category: req.body.category
        req.body
      )
      res.status(204)
      res.json(editedProd)
    } catch (err) {
      next(err)
    }
  } else {
    res.send('not an admin')
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
