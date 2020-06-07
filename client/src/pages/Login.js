import React,{ useState } from "react";
// import {Router} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
 
function App() {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const [cookies, setCookie] = useCookies(['username']);
  const [isLogin, setIsLogin] = useState(cookies.username)

  const onSubmit = (data) => {
    // var mySubmit = (event) => {
          // event.preventDefault();
          axios.post('/login',data).then(res=>{
            if(res.status===200){
                setCookie('username', res.data)
                setIsLogin(true)
            }
          })
        // }
    // console.log(data);
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLogin?(<Redirect
            to={{
              pathname: "/user",
              // state: { from: location }
            }}
          />):(<></>)}
      <label>Username</label><br/>
      <input name="username" type="text" ref={register({required: true})} />
      {errors.username && 'Username is required.'}
      <br/>
      <label>Password</label><br/>
      <input name="password" type="password" ref={register({ required: true })} />
      {errors.password && 'Password is required.'}
      <br/>
      <input type="submit" />
    </form>
  );
}
// function Login () {
//   // static propTypes = {
//   //   cookies: instanceOf(Cookies).isRequired
//   // };
//   var [isLogin, setIsLogin] = useState(true)
//   var [username, setUsername] = useState('')
//   var [password, setPassword] = useState('')
//   // constructor(props) {
//   //   super(props);
//   //   state = {
//   //     isLogin: false,
//   //     username: '',
//   //     password: null,
//   //   };
//   // }
//   // var myChangeHandler = (event) => {
//   //   let nam = event.target.name;
//   //   let val = event.target.value;
//   //   setState({[nam]: val});
//   // }
//   var mySubmit = (event) => {
//     event.preventDefault();
//     var { username, password} = state;
//     axios.post('/login',{
//       username: username,
//       password: password
//     }).then(res=>{
//       if(res.status==200){
//         // alert("hahahd")
//           Cookies.set('username', res.data)
//           setUsername('')
//           setPassword('')
//           setIsLogin(true)
//       }
//     })
//   }
//     return (
      
//       <form onSubmit={mySubmit}>
        // {isLogin?(<Redirect
        //     to={{
        //       pathname: "/",
        //       // state: { from: location }
        //     }}
        //   />):(<></>)}
//       <h1>Login </h1>
//       <p>Enter your name:</p>
//       <input
//         type='text'
//         name='username'
//         value={username}
//         onChange={setUsername(this.value)}
//       />
//       <p>Enter your password:</p>
//       <input
//         type='password'
//         name='password'
//         value={password}
//         onChange={myChangeHandler}
//       />
//       <br/>
//       <button type='submit'>Login</button>
//       </form>
//     );
// }
export default App;