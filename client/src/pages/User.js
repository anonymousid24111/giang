import React,{ useState } from "react";
import {Router} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import checkToken from '../utils/checkToken'
function App() {
  const [cookies, setCookie] = useCookies(['username']);
  const [isLogin, setIsLogin] = useState(cookies.username)

  const onSubmit = (data) => {
          axios.post('/login',data).then(res=>{
            if(res.status==200){
                setCookie('username', res.data)
                setIsLogin(true)
            }
          })
  };
  const test = ()=>{
    checkToken()
  }
  return (
    <>
      <p>Userpage</p>
      <button onClick={()=>test()}>test</button>
      {!isLogin?(<Redirect
            to={{
              pathname: "/login",
            }}
          />):(<></>)}
    </>
  );
}
      
export default App;