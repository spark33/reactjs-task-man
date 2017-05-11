import React from 'react';

export default class Task extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			task: this.props.task,
      changingUser: false,
		}
    this.toggleChangingUser = this.toggleChangingUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
	}

  render() {
    //task and action header names. simple component. 
    return (
        <tr>
					{this.renderTaskName()}
          {this.renderTaskUser()}
          <td onClick={() => this.handleDelete()}>X</td>
				</tr>
    );
  }

  handleDelete() {
    const task = this.props.task;
    console.log("at handle level:")
    console.log(task);
    this.props.deleteTask(task);
  }

  //this function determines how the tasks will be displayed in the table.
  renderTaskName() {
    //put the task and isCompleted variables on the end of the this.props object
    const task = this.props.task;
    const isCompleted = this.props.task.isCompleted;

    //object with ternary selector for color of task name
    const taskStyle = {
      color: isCompleted ? 'green' : 'red',
      cursor: 'pointer'
    }

    return (
      <td style={taskStyle}
        onClick={this.props.toggleTask.bind(this, task)}
      >
        {task.task}
      </td>

    )
  }

  renderTaskUser() {

    if(!this.state.changingUser) {
      return (
        <td onClick={this.toggleChangingUser}>
          {this.state.task.user}
        </td>
      );
    }
    return (
      <td>
        <select onChange={this.updateUser}>
          <option key="select" value="select">
            Select a user
          </option>
          {
            this.props.userList.map((user) => 
              <option key={user} value={user}>
                {user}
              </option>
            )
          }
        </select>
      </td>
    )

  }

  toggleChangingUser() {
    this.setState({changingUser: !this.state.changingUser});
  }

  updateUser(event) {
    const newUser = event.target.value;
    this.props.changeUser(this.props.task, newUser);
    this.toggleChangingUser()
  }
}




