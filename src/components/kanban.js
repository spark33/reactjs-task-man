import React from 'react';
import Commands from './commands';
import TaskList from './task-list';
import AddTaskForm from './add-task-form';
import AddUserForm from './add-user-form';

export default class Kanban extends React.Component {

  constructor(props) {
    super(props);

    //set our todos array in state. this could be a db query if this was full stack.
    this.state = {
      todos: [
        {
          task: "Task 1",
          user: "Sean",
          isCompleted: false
        },
        {
          task: "Task 2",
          user: "Raja",
          isCompleted: true
        },
      ],
      userList: ["Sean", "Raja", "David"]
    }
  }

  render() {
    return (
        <div>
          <p>Kanban!</p>
          <Commands />
          <AddTaskForm 
            taskList={this.state.todos}
            userList={this.state.userList}
            addTask={this.addTask.bind(this)}
          />
          <AddUserForm 
            userList={this.state.userList}
            addUser={this.addUser.bind(this)}
          />
          {this.state.userList.map((user) =>
            <TaskList 
              tasks={this.state.todos}
              user={user}
              userList={this.state.userList}
              key={user}
              updateTask={this.updateTask.bind(this)}
              toggleTask={this.toggleTask.bind(this)}
              changeUser={this.changeUser.bind(this)}
            />
          )}
        </div>
    );
  }

  updateTask(oldTask, newTask) {
    const todoIndex = this.state.todos.indexOf(oldTask)
    this.state.todos[todoIndex] = newTask;

    //set state with updated todos array
    this.setState({ todos: this.state.todos})
  }

  toggleTask(task) {
    const taskIndex = this.state.todos.indexOf(task)
    this.state.todos[taskIndex].isCompleted = !this.state.todos[taskIndex].isCompleted;
    this.setState({todos: this.state.todos})
  }

  changeUser(task, user) {
    const taskIndex = this.state.todos.indexOf(task);
    this.state.todos[taskIndex].user = user;
    this.setState({todos: this.state.todos});
  }

  addUser(user) {
    this.state.userList.push(user);
    this.setState({userList: this.state.userList});
  }

  addTask(task) {
    this.state.todos.push(task);
    this.setState({todos: this.state.todos});
  }
}
