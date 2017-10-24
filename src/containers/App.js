import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../redux/modules/Auth/actions'
import fetch from 'isomorphic-fetch'

// views
import Welcome from '../views/Welcome'
import Signup from '../views/Signup'
import Login from '../views/Login'
import NotFound from '../views/NotFound'
import Dashboard from '../views/Dashboard'
import ApplicationView from '../views/ApplicationView'
import Navbar from '../views/Navbar'

// custom made components
import { authenticate, authFailure } from '../redux/modules/Auth/actions'

type Props = {
  isAuthenticated: boolean,
  logout: () => void,
  authenticate: () => void,
  authFailure: () => void
}

class App extends Component {

  props: Props

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.authenticate(token)
    } else {
      // Ping the API server in case it hasn't been used in 30 minutes and Heroku put it to sleep
      fetch('http://fps-compatibility-api.herokuapp.com/api/v1')
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar isAuthenticated={this.props.isAuthenticated} logout={this.props.logout} currentUser={this.props.currentUser.name || this.props.currentUser.username} admin={this.props.currentUser.admin}/>
          <Switch>
            <Route exact path="/" render={() => (
              this.props.isAuthenticated ? (
                <Redirect to="/dashboard"/>
              ) : (
                <Welcome />
              )
            )}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin/new_user" render={() => (
              this.props.currentUser && this.props.currentUser.admin ? (
                <Signup />
              ) : (
                  <Redirect to="/dashboard" />
                )
            )} />
            <Route exact path="/dashboard" render={() => (
              this.props.isAuthenticated ? (
                <Dashboard />
              ) : (
                <Redirect to="/"/>
              )
            )}/>
            <Route exact path="/application" render={() => (
              this.props.isAuthenticated ? (
                <ApplicationView />
              ) : (
                  <Redirect to="/" />
                )
            )} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout,
    authenticate,
    authFailure
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
