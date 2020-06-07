import React,{ useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
// import axios from 'axios'
import { useCookies } from 'react-cookie';
import Home from './HomePage';
import Call from './user/Call';
import Chat from './user/Chat';
import Search from '.././components/Search'
import checkToken from '../utils/checkToken'
function App() {
  const [cookies, setCookie] = useCookies(['username']);
  const [isLogin, setIsLogin] = useState(cookies.username)

  // const onSubmit = (data) => {
  //         axios.post('/login',data).then(res=>{
  //           if(res.status==200){
  //               setCookie('username', res.data)
  //               setIsLogin(true)
  //           }
  //         })
  // };
  const test = ()=>{
    checkToken()
  }
  return (
    <Router>
      <div className="sidenav">
        <Link to={`/user/activity`}>activity</Link>
        <Link to={`/user/chat`}>chat</Link>
        <Link to={`/user/calendar`}>calendar</Link>
        <Link to={`/user/assignment`}>assignment</Link>
        <Link to={`/user/call`}>call</Link>
        <Link to={`/user/file`}>file</Link>
        <Link to={`/user/team`}>team</Link>
        
      </div>

      <div className="main">
        <Search/>
        {/* <h2>Sidenav Example</h2>
        <p>This sidenav is always shown.</p>
        <button onClick={()=>test()}>test</button> */}
        <Switch>
          <Route exact path="/user/activity">
            <Home />
          </Route>
          <Route exact path="/user/activity">
            <Home />
          </Route>
          <Route exact path="/user/chat">
            <Chat />
          </Route>
          <Route exact path="/user/assignment">
            <Home />
          </Route>
          <Route exact path="/user/calendar">
            <Home />
          </Route>
          <Route exact path="/user/file">
            <Home />
          </Route>
          <Route exact path="/user/call">
            <Call />
          </Route>
          <Route exact path="/user/team">
            <Home />
          </Route>
        </Switch>
      </div>
      {!isLogin?(<Redirect
            to={{
              pathname: "/login",
            }}
          />):(<></>)}
      
      <style jsx>{`
        .sidenav {
          height: 100%;
          width: 10%;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          // padding-top: 20px;
        }
        
        .sidenav a {
          padding: 10px 2px;
          text-decoration: none;
          font-size: 15px;
          color: #818181;
          display: block;
        }
        
        .sidenav a:hover {
          color: #f1f1f1;
        }
        
        .main {
          
          margin-left: 10%; /* Same as the width of the sidenav */
        }
        
        // @media screen and (max-height: 450px) {
        //   .sidenav {padding-top: 15px;}
        //   .sidenav a {font-size: 18px;}
        // }
      `}</style>
    </Router>
  );
}
      
export default App;