import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, admin} = props
  console.log('is you admin?', admin)

  return (
    <div className="homepage">
      <h2>Welcome, {email}!</h2>
      {admin &&
        <h2>
          <Link to="/addProduct" className="google buttons">
          Add a new product to the inventory</Link>
        </h2>
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
    admin: state.users.user.adminStatus

  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
