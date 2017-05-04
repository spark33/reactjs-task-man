import React from 'react';

export default class AddTaskForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {error: null}
	}

  render() {
    //task and action header names. simple component. 
    return (
        <div>
          <h1>Add a Task</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
          	<input type="text" ref="newTaskInput" />
          	<select ref="newTaskUserInput">{
	            this.props.userList.map((user) => 
	              <option key={user} value={user}>
	                {user}
	              </option>
	            )
		        }
          	</select>
          	<input type="submit" />
          </form>
          {this.renderError()}
        </div>
    );
  }

  handleSubmit(event) {
  	event.preventDefault();
  	const newTask = {
  		task: this.refs.newTaskInput.value,
  		user: this.refs.newTaskUserInput.value,
  		isComplete: false
  	};

  	const errorMessage = this.getInputError(newTask);
  	if(errorMessage) {
      this.setState({error: errorMessage})
      return;
    }
    this.setState({ error: null });
    this.props.addTask(newTask)
  }

  getInputError(task) {
  	const title = task.task;
  	const user = task.user;
  	const taskTitles = this.props.taskList.map((task) => task.task);
  	if(!title) {
  		return 'Please enter a task.'
  	} else if (!user) {
  		return 'Please select a valid user'
  	} else if(taskTitles.indexOf(title) !== -1) {
      return 'Task already exists.'
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
