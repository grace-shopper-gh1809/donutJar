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
  CartView,
  AllUsers
} from './components'
import {me} from './store'
import {fetchProducts} from './store/product'
import AllProducts from './components/AllProducts'
import AllProdAdmin from './components/AllProdAdmin'
import SingleProduct from './components/SingleProduct'
import RoundDonuts from './components/RoundDonuts'
import HoleyDonuts from './components/HoleyDonuts'
import SearchBarResult from './components/SearchBarResult'
import OrderHistory from './components/OrderHistory'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchProducts()
  }
  render() {
    const {isLoggedIn, admin, searchInput} = this.props
    return (
      <Switch>
        {/* Routes placed here are for all visitors */}
        (
        <Route path="/search" component={SearchBarResult} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/round" component={RoundDonuts} />
        <Route path="/holey" component={HoleyDonuts} />
        <Route
          path="/cart"
          component={props => <CartView {...props} {...this.props} />}
        />
        <Route exact path="/products/:id" component={SingleProduct} />
        )
        {admin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/products/:id/editProduct" component={EditProduct} />
            <Route path="/home" component={UserHome} />
            <Route path="/userList" component={AllUsers} />
            <Route path="/addProduct" component={AddProduct} />
            <Route path="/orderHistory" component={OrderHistory} />
            <Route exact path="/" component={AllProdAdmin} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/orderHistory" component={OrderHistory} />
            <Route exact path="/" component={AllProducts} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route exact path="/" component={AllProducts} />
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
    isLoggedIn: !!state.users.user.id,
    admin: state.users.user.adminStatus,
    products: state.products.products,
    searchInput: state.products.searchInput
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
