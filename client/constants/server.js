const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000/api/payment'
  : 'http://localhost:3000/api/payment';

export default PAYMENT_SERVER_URL;
