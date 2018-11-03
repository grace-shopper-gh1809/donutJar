import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/user'
import UserList from './UserList'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  render() {
    const users = this.props.users || []
    console.log('props for allusers' , users)
    return (
      <div>
        <div className="sides">
          <div className="left-side">
            {users.length ? (
              <UserList users={users} />
            ) : (
              <div>There are no users in the donutJar..if you are seeing this, you are a ghost</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  users: state.users.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllUsers)
)
