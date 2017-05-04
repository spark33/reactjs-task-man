import React from 'react';

export default class AddUserForm extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    //task and action header names. simple component. 
    return (
        <div>
        	<h1>Add a New User</h1>
          <form onSubmit={this.handleSubmit}>
          	<input type="text" ref="newUserInput" />
          	<input type="submit" />
          </form>
          {this.renderError()}
        </div>
    );
  }

  handleSubmit(event) {
  	event.preventDefault();
  	const newUser = this.refs.newUserInput.value;
  	const errorMessage = this.checkInputError(newUser);
  	if(errorMessage) {
      this.setState({error: errorMessage})
      return;
    }
    this.setState({ error: null });
    this.props.addUser(newUser);
  }

  checkInputError(newUser) {
  	//if blank input, return error string
    if(!newUser) {
      return 'Please enter a name'
    } else if(this.props.userList.indexOf(newUser) !== -1) {
      return 'User already exists'
    } else {
      //if there is a user input and it doesnt repeat, return null! 
      return null;
    }
  }

  //if !error, this function returns a null value.
  //if error, it returns a div with the error text.
  renderError() {
    if(!this.state.error) {
      return null;
    }
      return <div style={{color:'red'}}>{this.state.error}</div>;
  }
}
