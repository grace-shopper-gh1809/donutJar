import React from 'react'

const UserList = props => {
  const users = props.users || []
  const me = props.me
  console.log('me', me)
  return (
    <div className="donut-container">
      <h2 id="donut-header">Users</h2>
      <div className="cart">
        <table className="top-padding">
          <thead>
            <tr>
              <td>User Id</td>
              <td>Email</td>
              <td>Address</td>
              <td>Administrative Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          {users.map((user) => {
            return (
              <tbody key={user.id}>
                <tr>
                  <td>{user.id}</td>
                  <td className="cart-title">
                    {user.email}
                  </td>
                  <td>{user.address}</td>
                  <td>{user.adminStatus ? 'Admin' : 'Customer'}</td>
                  <td>
                  {user.id === me.id ?
                  '':
                  <button className="search-btn buttons" onClick ={() => {props.remove(user)}}>Delete User</button>
                  }
                  <br></br>
                  {user.adminStatus ?
                  '':
                  <button className="search-btn buttons" onClick ={() => {props.makeAdmin(user)}}>Make Admin</button>
                  }
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
    </div>
    </div>

  )
}

export default UserList
