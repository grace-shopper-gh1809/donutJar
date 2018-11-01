import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AddProduct,
  EditProduct,
  StatelessSingleProduct,
  CartView
} from './components'
import {me} from './store'
import {fetchProducts} from './store/product'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import RoundDonuts from './components/RoundDonuts'
import HoleyDonuts from './components/HoleyDonuts'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchProducts()
  }

  render() {
    const {isLoggedIn, admin} = this.props
    console.log('is admin?', admin)
    console.log('is loggedin?', isLoggedIn)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/round" component={RoundDonuts} />
        <Route exact path="/holey" component={HoleyDonuts} />
        <Route exact path="/cart" component={CartView} />

        {admin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/addProduct" component={AddProduct} />
            <Route
              exact
              path="/products/:id/editProduct"
              component={EditProduct}
            />
            <Route path="/home" component={UserHome} />
            <Route exact path="/round" component={RoundDonuts} />
            <Route exact path="/holey" component={HoleyDonuts} />

            {}
          </Switch>
        )}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/round" component={RoundDonuts} />
            <Route exact path="/holey" component={HoleyDonuts} />
            {}
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.users.user.id,
    admin: state.users.user.adminStatus,
    products: state.products.products
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchProducts: () => dispatch(fetchProducts())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
