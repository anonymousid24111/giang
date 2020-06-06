import React from "react";
import axios from 'axios'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: null,
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  mySubmit = (event) => {
    event.preventDefault();
    var { username, password} = this.state;
    axios.post('/login',{
      username: username,
      password: password
    }).then(res=>{
      console.log(res.data.data)
    })
  }
  render() {
    return (
      <form onSubmit={this.mySubmit}>
      <h1>Login </h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Enter your password:</p>
      <input
        type='password'
        name='password'
        onChange={this.myChangeHandler}
      />
      <br/>
      <button type='submit'>Login</button>
      </form>
    );
  }
}
export default Login;