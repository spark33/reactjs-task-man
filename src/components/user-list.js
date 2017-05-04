import React from 'react';

export default class UserList extends React.Component {

	constructor(props) {
		super(props);
	}

  render() {
    //task and action header names. simple component. 
    return (
        <div>
          <h1>Users on Project</h1>
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
  	this.props.deleteUser(user);
  }
}
