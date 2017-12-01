import React, { Component } from 'react';

class App extends Component {
  state = {
    name: '',
    password: '',
    message: '',
    users: [],
  }

  componentWillMount() {
    fetch('http://localhost:3000/users')
      .then(response => response.json()) 
      .then(users => {
        this.setState({
          users
        });
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onNameChange}/>
          <input type="password" onChange={this.onPasswordChange}/>
          <input type="submit"/>
        </form>
        {this.state.message && <div>{this.state.message}</div>}
        <ul>
          {this.state.users && this.state.users.map((user, i) => (
            <li key={i}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          message: data.message,
          users: [...this.state.users, data.user]
        })
      })
  }
}


export default App;
