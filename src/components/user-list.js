import React from 'react';

export default class UserList extends React.Component {
  
  render() {
    //task and action header names. simple component. 
    return (
        <div>
          <h1>Users on Project</h1>
          <h3>Project Leader: {this.props.leader}</h3>
          <table>
          <tbody>
          {
          	this.props.userList.map((user) => 
              <tr key={user}> 
              	<td key={user}>{user}</td>
              	<td onClick={() => this.handleDelete(user)}>X</td>
              </tr>
            )
          }
          </tbody>
          </table>
        </div>
    );
  }

  handleDelete(user) {
  	if(user !== this.props.leader) {
      this.props.deleteUser(user);
    } else {
      alert("Cannot delete project leader")
    }
  }
}
