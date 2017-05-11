import React from 'react';
import User from './user';

export default class UserList extends React.Component {
  
  render() {
    return (
        <div>
          <h3>Project Leader: {this.props.leader}</h3>
          <table>
          <tbody>
          {
          	this.props.userList.map((user) => 
              <User 
                key={user}
                user={user}
                handleDelete={this.handleDelete.bind(this)}
              />
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
