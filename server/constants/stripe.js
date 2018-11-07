// const configureStripe = require('stripe');

// const STRIPE_SECRET_KEY = 'sk_test_S8dnWvtR0JZSkX94uyxqLC1z';

// const stripe = configureStripe(STRIPE_SECRET_KEY);

// module.exports = stripe;

const configureStripe = require('stripe');

  //require('../../localSecrets')


const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = configureStripe(STRIPE_SECRET_KEY);
module.exports = stripe;
