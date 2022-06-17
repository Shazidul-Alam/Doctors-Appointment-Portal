import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Appointment from './Pages/Appointment/Appointment/Appointment';

import Register from './Pages/Login/Register/Register';
import Login from './Pages/Login/Login/Login';

function App() {
  return (
   <Router>
      <Switch>
          <Route  path="/appointment">
            <Appointment></Appointment>
          </Route>
          <Route  path="/login">
            <Login></Login>
          </Route>
          <Route  path="/register">
            <Register></Register>
          </Route>
          <Route path="/users">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
   </Router>
  );
}

export default App;
