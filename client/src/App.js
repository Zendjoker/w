import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import MessengerTest from "./pages/Niveau/Messengertest/MessengerTest"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import TestHome from "./pages/Niveau/HomeNiveau/HomeTest" 
import HomeTest from "./pages/Niveau/HomeNiveau/HomeTest";
import Messenger from "./pages/messenger/Messenger"
function App() {
  const { user } = useContext(AuthContext);
   
  return (
    <Router>
      <Switch>
      <Route exact path="/">
          {user ? <HomeTest/> : <Login/>}
        </Route>
<Route path="/home">{user ? <TestHome/> : <Redirect to="/login"/>} </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/Logout"><Login/></Route>
        <Route path="/Registerr"><Register/></Route>
        <Route path="/Loginn">{!user?<Register/>:<Redirect to ="/Logout"/>}</Route>
      </Switch>
    </Router>
  );
}

export default App;