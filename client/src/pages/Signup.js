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
  const [er, seter] = useState()
  const onSubmit = (data) => {
    // var mySubmit = (event) => {
          // event.preventDefault();
          axios.post('/signup',data).then(res=>{
            if(res.status===200){
                // setCookie('username', res.data.username)
                // setCookie('userid', res.data.userid)
                // setCookie('token', res.data.token)
                // setIsLogin(true);
                window.location.href='/login'
                return <Redirect to="/user"/>
            }
            else{
              seter(res.data)
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
      <div>{er}</div>
    </form>
  );
}
export default App;