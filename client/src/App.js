import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { useCookies } from 'react-cookie';

import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <p>username is {cookies.username?cookies.username:'null'}</p> */}
          {
           cookies.username?(
           <>
            <li>
            <Link to="/User">User</Link>
          </li>
          <li>
            <button onClick={()=>{removeCookie('username');}}>Logout</button>
          </li>
           </>)
           :(<>
            <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Signup">Signup</Link>
          </li></>)}

        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/User">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


function Topic() {
  // The <Route> that rendered this component has a
  // path of `/Login/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
