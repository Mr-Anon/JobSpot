import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Option from "./components/layout/option";
import Register_app from "./components/auth/Register_app";
import Register_rec from "./components/auth/Register_rec";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AddJob from "./components/dashboard/AddJob";
import RecJobs from "./components/dashboard/recJobs";
import AppJobs from "./components/dashboard/appJobs";
import RecProfile from "./components/dashboard/recprofile";
import AppProfile from "./components/dashboard/appprofile";
import EditRecProfile from "./components/dashboard/editrecprofile";
import EditAppProfile from "./components/dashboard/editappprofile";
import MyApplication from "./components/dashboard/MyApplication";
import RecJobInfo from "./components/dashboard/recjobinfo";
import MyEmployees from "./components/dashboard/MyEmployees";
// Check for token to keep user logged in

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section>
              <Switch>
                <Route exact path="/option" component={Option} />
                <Route exact path="/register_app" component={Register_app} />
                <Route exact path="/register_rec" component={Register_rec} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/addjob" component={AddJob} />
                <PrivateRoute exact path="/recjobs" component={RecJobs} />
                <PrivateRoute exact path="/appjobs" component={AppJobs} />
                <PrivateRoute exact path="/recprofile" component={RecProfile} />
                <PrivateRoute exact path="/appprofile" component={AppProfile} />
                <PrivateRoute exact path="/editrecprofile" component={EditRecProfile} />
                <PrivateRoute exact path="/editappprofile" component={EditAppProfile} />
                <PrivateRoute exact path="/myapplications" component={MyApplication} />
                <PrivateRoute exact path="/recjobinfo" component={RecJobInfo} />
                <PrivateRoute exact path="/myemployees" component={MyEmployees} />
              </Switch>
            </section>
          </div>
        </Router>
      </Provider>
    );
  }
}export default App;

