const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'adminStatus', 'address']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.put('/:id', async (req, res, next) => {
    try {
      const id = +req.params.id
      const user = await User.findById(id)
      const editedUser = await user.update(
        {adminStatus: true}
      )
      res.status(204)
      res.json(editedUser)
    } catch (err) {
      next(err)
    }
})

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(204).end())
    .catch(err => next(err))
})
