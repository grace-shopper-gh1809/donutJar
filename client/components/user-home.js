import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, admin} = props
  return (
    <div className="donut-container">
    <h2 id="donut-header">Welcome, {email}</h2>
      {admin &&
      <div>Add a new product to the inventory: <Link to="/addProduct">here </Link></div>
      }
      {admin &&
      <div>Manage DonutJar users: <Link to="/userList">here </Link></div>
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.users.user.email,
    admin: state.users.user.adminStatus,
    address: state.users.user.address
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
