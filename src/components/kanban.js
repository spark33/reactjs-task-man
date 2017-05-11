import React from 'react';
import Commands from './commands';
import TaskList from './task-list';
import UserList from './user-list';
import AddTaskForm from './add-task-form';
import AddUserForm from './add-user-form';

export default class Kanban extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      name: null,
      leader: null,
      taskList: [],
      userList: []
    }
  }

  render() {
    return (
        <div>
          <h1>{this.state.name}</h1>
          <div id="sidebar">
            <Commands 
              saveProject={this.saveProject.bind(this)}
              loadProject={this.loadProject.bind(this)}
            />
            <UserList 
              leader={this.state.leader}
              userList={this.state.userList}
              deleteUser={this.deleteUser.bind(this)}
            />
            <AddTaskForm 
              taskList={this.state.taskList}
              userList={this.state.userList}
              addTask={this.addTask.bind(this)}
            />
            <AddUserForm 
              userList={this.state.userList}
              addUser={this.addUser.bind(this)}
            />
          </div>
          <div id="taskLists">
            {this.state.userList.map((user) =>
              <TaskList 
                tasks={this.state.taskList}
                user={user}
                userList={this.state.userList}
                key={user}
                updateTask={this.updateTask.bind(this)}
                toggleTask={this.toggleTask.bind(this)}
                deleteTask={this.deleteTask.bind(this)}
                changeUser={this.changeUser.bind(this)}
              />
            )}
          </div>
        </div>
    );
  }

  // PROJECT FUNCTIONS //
  saveProject() {
    alert("There's no back-end yet!")
  }

  loadProject(file) {
    const kanban = this;
    const reader = new FileReader();
    reader.onload = function() {
      const newState = JSON.parse(reader.result);
      kanban.setState(newState)
    };
    reader.readAsText(file);
  }

  // TASK FUNCTIONS //

  addTask(task) {
    this.state.taskList.push(task);
    this.setState({taskList: this.state.taskList}, () => console.log(this.state.TaskList));
  }

  updateTask(oldTask, newTask) {
    const todoIndex = this.state.taskList.indexOf(oldTask)
    this.state.taskList[todoIndex] = newTask;

    //set state with updated taskList array
    this.setState({ taskList: this.state.taskList})
  }

  toggleTask(task) {
    const taskIndex = this.state.taskList.indexOf(task)
    this.state.taskList[taskIndex].isCompleted = !this.state.taskList[taskIndex].isCompleted;
    this.setState({taskList: this.state.taskList})
  }

  changeUser(task, user) {
    const taskIndex = this.state.taskList.indexOf(task);
    this.state.taskList[taskIndex].user = user;
    this.setState({taskList: this.state.taskList});
  }

  deleteTask(taskToDelete) {

    const index = this.state.taskList.indexOf(taskToDelete)
    if(index !== -1) {
      this.state.taskList.splice(index, 1)
      this.setState({
        //taskList: this.state.taskList,
        taskList: this.state.taskList.filter((todo) => todo !== taskToDelete),
      }, () => console.log(this.state.taskList));
    }

  }


  // USER FUNCTIONS //

  addUser(user) {
    if(this.state.leader === null) {
      this.setState({leader: user })
    }
    this.state.userList.push(user);
    this.setState({userList: this.state.userList});
  }

  deleteUser(userToDelete) {
    if(this.state.userList.indexOf(userToDelete) !== -1) {

      this.setState({
        taskList: this.state.taskList.filter((todo) => todo.user !== userToDelete),
        userList: this.state.userList.filter((user) => user !== userToDelete)
      });
    }
    if(userToDelete === this.state.leader) {
      this.setState({leader: null})
    }
  }
}
