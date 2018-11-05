import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import SearchBar from './SearchBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <h1>Donut Jar</h1> <br />
      {isLoggedIn ? (
        <div className="navbar-links">
          {/* The navbar will show these links after you log in */}
          <Link to="/" className="signin">
            All Donuts
          </Link>
          <Link to="/round" className="signin">
            Round Donuts
          </Link>
          <Link to="/holey" className="signin">
            Holey Donuts
          </Link>
          <Link to="/cart" className="signin">
            Cart
          </Link>
          <Link to="/orderHistory" className="signin">
            Order History
          </Link>
          <Link to="/home" className="signin">
            Home
          </Link>
          <a href="#" onClick={handleClick} className="signin">
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Link to="/" className="signin">
            All Donuts
          </Link>
          <Link to="/round" className="signin">
            Round Donuts
          </Link>
          <Link to="/holey" className="signin">
            Holey Donuts
          </Link>
          <Link to="/login" className="signin">
            Login
          </Link>
          <Link to="/signup" className="signin">
            Sign Up
          </Link>
          <Link to="/cart" className="signin">
            Cart
          </Link>
        </div>
      )}
      <div>
        <SearchBar />
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.users.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
