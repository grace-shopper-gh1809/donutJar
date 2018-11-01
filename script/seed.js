'use strict'

// const db = require('../server/db')
const {db, User, Product, Order, Review} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    password: '123',
    address: '5 Hanover Square, New York, NY 10004',
    adminStatus: true
  },
  {
    email: 'murphy@email.com',
    password: '123',
    address: '100 Donut Avenue, New York, NY 10004',
    adminStatus: false
  },
  {
    email: 'david@email.com',
    password: 'hello',
    address: '10 Sprinkle Boardwalk, New York, NY 10004',
    adminStatus: true
  },
  {
    email: 'karen@email.com',
    password: 'hungry',
    address: '5 Hanover Square, New York, NY 10004',
    adminStatus: false
  }
]

const products = [
  {
    title: 'Mini Sprinkles',
    description: 'Mini donut with sprinkles',
    price: 200,
    inventory: 7,
    imageUrl: '/MiniSprink.png',
    category: 'Holey-Donut'
  },
  {
    title: 'Birthday Batter',
    description: 'Doughtnut cake batter and sprinkles',
    price: 300,
    inventory: 5,
    imageUrl: '/Birthday-Batter.png',
    category: 'Round'
  },
  {
    title: 'Blueberry Cake',
    description: 'Blueberry cake in doughnut form',
    price: 300,
    inventory: 5,
    imageUrl: '/Blueberry-Cake.png',
    category: 'Holey-Donut'
  },
  {
    title: 'Chocolate Cake',
    description: 'Chocolate cake doughnut',
    price: 300,
    inventory: 5,
    imageUrl: '/Chocolate-Cake.png',
    category: 'Holey-Donut'
  },
  {
    title: 'Glazed Kreme',
    description: 'Cream-filled doughnut',
    price: 300,
    inventory: 5,
    imageUrl: '/Glazed-Kreme-Filled.png',
    category: 'Round'
  },
  {
    title: 'Chocolate Iced Ring',
    description: 'Chocolate glazed donut',
    price: 300,
    inventory: 5,
    imageUrl: '/Choc-Iced-Ring-sprinkles.png',
    category: 'Holey-Donut'
  },
  {
    title: 'New York Cheesecake',
    description: 'World famous cheesecake in doughnut form',
    price: 400,
    inventory: 12,
    imageUrl: '/New-York-Cheesecake.png',
    category: 'Round'
  },
  {
    title: 'Strawberry Iced Ring',
    description: 'Strawberry glazed doughnut',
    price: 250,
    inventory: 10,
    imageUrl: '/Strawberry-iced-Ring.png',
    category: 'Holey-Donut'
  }
]

const orders = [
  {
    orderStatus: 'Processing',
    quantity: 5,
    price: 200,
    productId: 1,
    userId: 2
  },
  {
    orderStatus: 'Completed',
    quantity: 3,
    price: 600,
    productId: 3,
    userId: 1
  },
  {
    orderStatus: 'Cancelled',
    quantity: 5,
    price: 200,
    productId: 4,
    userId: 2
  },
  {
    orderStatus: 'Created',
    quantity: 3,
    price: 200,
    productId: 5,
    userId: 3
  }
]

const reviews = [
  {
    content: 'Delicious donuts!',
    rating: 5,
    productId: 1,
    userId: 2
  },
  {
    content: 'Amazing morning donuts!',
    rating: 5,
    productId: 3,
    userId: 1
  },
  {
    content: 'We were sad to see there were only a few donuts left.',
    rating: 4,
    productId: 4,
    userId: 2
  },
  {
    content: 'Very slow delivery.',
    rating: 3,
    productId: 7,
    userId: 3
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(products.map(product => Product.create(product)))
  await Promise.all(orders.map(order => Order.create(order)))
  await Promise.all(reviews.map(review => Review.create(review)))
  console.log(
    `seeded ${users.length} users, seeded ${orders.length} orders, seeded ${
      products.length
    } products, seeded ${reviews.length} reviews,`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
