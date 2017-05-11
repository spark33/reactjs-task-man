import React from 'react';

export default class User extends React.Component {

	render() {
		return (
			<tr> 
      	<td>{this.props.user}</td>
      	<td onClick={() => this.props.handleDelete(this.props.user)}>X</td>
      </tr>
		);
	}

}