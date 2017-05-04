import React from 'react';
import Task from './task';

export default class TaskList extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      tasks: this.props.tasks
    }
  }

  render() {

    const user = this.props.user;
    const filteredTasks = this.state.tasks.filter(function(task) { return task.user === user });

    return (
        <div>
        	<h5>{this.state.user}'s Task List</h5>
          <table>
        		<thead>
        			<tr>
        				<th>Task</th>
        				<th>User</th>
        			</tr>
        		</thead>
        		<tbody>
        			{
        				filteredTasks.map((task) =>
      						<Task 
                    task={task} 
                    userList={this.props.userList}
                    key={task.task}
                    updateTask={this.props.updateTask.bind(this)}
                    toggleTask={this.props.toggleTask.bind(this)}
                    deleteTask={this.props.deleteTask.bind(this)}
                    changeUser={this.props.changeUser.bind(this)}
                  />
        				)
        			}
        		</tbody>
          </table>
        </div>
    );
  }
}
