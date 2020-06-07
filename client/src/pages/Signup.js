import React from "react";
import axios from 'axios'
class Signup extends React.Component {
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
    axios.post('/Signup',{
      username: username,
      password: password
    }).then(res=>{
      console.log(res.data.data)
    })
  }
  render() {
    return (
      <form onSubmit={this.mySubmit}>
      <h1>Signup </h1>
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
      <button type='submit'>Signup</button>
      </form>
    );
  }
}
export default Signup;