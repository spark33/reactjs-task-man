import React from 'react';
import Commands from './commands';
import TaskList from './task-list';
import UserList from './user-list';
import AddTaskForm from './add-task-form';
import AddUserForm from './add-user-form';

export default class Kanban extends React.Component {

  constructor(props) {
    super(props);

    //set our taskList array in state. this could be a db query if this was full stack.
    this.state = {
      leader: "Sean",
      taskList: [
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
    );
  }

  // TASK FUNCTIONS //

  addTask(task) {
    this.state.taskList.push(task);
    this.setState({taskList: this.state.taskList});
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
    console.log(this.state.taskList)
    const index = this.state.taskList.indexOf(taskToDelete)
    if(index !== -1) {
      this.state.taskList.splice(index, 1)
      this.setState({
        taskList: this.state.taskList,
      });
    }
  }


  // USER FUNCTIONS //

  addUser(user) {
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
  }
}
