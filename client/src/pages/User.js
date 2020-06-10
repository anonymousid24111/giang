import React,{ useState, useEffect } from "react";
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
// import { useCookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import Home from './HomePage';
import Call from './user/Call';
import Chat from './user/Chat';
import Activity from './user/Activity';
import Assignment from './user/Assignment';
import Calendar from './user/Calendar';
import File from './user/File';
import Team from './user/Team';
import Search from '.././components/Search'
import checkToken from '../utils/checkToken'
import OneTeam from "../components/OneTeam";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT);
function App() {
  const [cookies, setCookie] = useCookies(['username']);
  const [isLogin, setIsLogin] = useState(cookies.username)
  useEffect(()=>{
    socket.emit("connectto", {
      username: cookies.username,
      userid: cookies.userid});
  },[])
  const test = ()=>{
    checkToken()
  }
  return (
    <Router>
      {!isLogin?(<Redirect
            to={{
              pathname: "/login",
            }}
          />):(<></>)}
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
          {/* <Route  path="/user/activity">
            <Home />
          </Route> */}
          <Route  path="/user/activity">
            <Activity />
          </Route>
          <Route  path="/user/chat">
            <Chat />
          </Route>
          <Route  path="/user/assignment">
            <Assignment />
          </Route>
          <Route  path="/user/calendar">
            <Calendar />
          </Route>
          <Route  path="/user/file">
            <File />
          </Route>
          <Route  path="/user/call">
            <Call />
          </Route>
          <Route exact path="/user/team">
            <Team />
          </Route>
          <Route  path="/user/team/:id">
            <OneTeam id={null}/>
          </Route>
        </Switch>
      </div>
      
      
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