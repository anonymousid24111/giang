import React from "react";
import {
  BrowserRouter as 
  Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { useCookies } from 'react-cookie';

import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'
import { connection } from "mongoose";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);

  return (
    <Router>
      <div>
          {
           cookies.username?(
            <></>
           )
           :(<>
          <a>
            <Link to="/">Home</Link>
          </a>
            <a>
            <Link to="/Login">Login</Link>
          </a>
          <a>
            <Link to="/Signup">Signup</Link>
          </a></>)}
        <Switch>
          <Route exact path="/">
            <Home />
            {cookies.token&&<Link to="/user">User</Link>}
            
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/User">
            {cookies.token?<User/>:<Redirect to="/"/>}
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
