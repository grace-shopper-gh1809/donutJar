import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <h1>Donut Jar</h1> <br />
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/" className="filter">
            All Donuts
          </Link>
          <Link to="/round" className="filter">
            Round Donuts
          </Link>
          <Link to="/holey" className="filter">
            Holey Donuts
          </Link>
          <Link to="/home" className="home">
            Home
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/" className="filter">
            All Donuts
          </Link>
          <Link to="/round" className="filter">
            Round Donuts
          </Link>
          <Link to="/holey" className="filter">
            Holey Donuts
          </Link>
          <Link to="/login" className="signin">
            Login
          </Link>
          <Link to="/signup" className="signin">
            Sign Up
          </Link>
        </div>
      )}
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
