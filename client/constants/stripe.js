const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_A6hkgr9i3ODS5idW8ovQ9XCW'
  : 'pk_test_A6hkgr9i3ODS5idW8ovQ9XCW';

export default STRIPE_PUBLISHABLE;