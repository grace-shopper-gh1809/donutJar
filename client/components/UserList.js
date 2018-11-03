import React from 'react'

const UserList = props => {
  const users = props.users || []
  console.log('userlisr', users[0].email)
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
                  <td>{user.adminStatus}</td>
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
