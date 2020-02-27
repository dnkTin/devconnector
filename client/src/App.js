import React from 'react';
import './App.css';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './action/authAction';
import Dashboard from './component/dashboard/Dashboard';
import { clearCurrentProfile } from './action/profileAction';
import PrivateRoute from './component/common/PrivateRoute';
import CreateProfile from './component/create-profile/CreateProfile';
// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check expire token
  const currentTime = Date.now() / 1000;
  // DOES IT RUN CONSTANTLY?
  if (decoded.exp < currentTime) {
    // set user and isAuthenticated
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile())
    // todo: clear current profile
    // redirect to login page
    window.location.href = '/login';
  }

}

function App() {
  return (
    <Provider ver store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* After login */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
          </div>
          <Footer />

        </div>
      </Router>
    </Provider>
  );
}

export default App;
