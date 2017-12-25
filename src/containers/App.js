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
import Loading from '../views/Loading'

// custom made components
import { authenticate, cancelAuthRequest } from '../redux/modules/Auth/actions'

type Props = {
  isAuthenticated: boolean,
  isAuthenticating: boolean,
  logout: () => void,
  authenticate: () => void,
  cancelAuthRequest: () => void
}

class App extends Component {

  props: Props

  componentDidMount() {
    const token = localStorage.getItem('token')
    console.log("Created for Fidelity Payment Services\nBy Yechiel Kalmenson")
    if (token) {
      this.props.authenticate(token)
    } else {
      this.props.cancelAuthRequest()
      // Ping the API server in case it hasn't been used in 30 minutes and Heroku put it to sleep
      fetch('http://fps-compatibility-api.herokuapp.com/api/v1')
    }
  }

  render() {

    if (this.props.isAuthenticating) {
      return <Loading/>
    }

    return (
      <Router>
        <div className="App">
          <Navbar isAuthenticated={this.props.isAuthenticated} logout={this.props.logout} currentUser={this.props.currentUser.name || this.props.currentUser.username} admin={this.props.currentUser.admin}/>
          <Switch>
            <Route exact path="/" render={() => this.props.isAuthenticated ? <Redirect to="/dashboard"/> : <Welcome/>}/>
            <Route exact path="/login" render={() => this.props.isAuthenticated ? <Redirect to="/dashboard" /> : <Login />} />
            <Route exact path="/admin/new_user" render={() => this.props.currentUser && this.props.currentUser.admin ? <Signup/> : <Redirect to="/dashboard"/>}/>
            <Route exact path="/dashboard" render={() => this.props.isAuthenticated ? <Dashboard /> : <Redirect to="/"/>}/>
            <Route exact path="/application" render={() => (Object.keys(this.props.currentApplication).length !== 0 ? <ApplicationView/> : <Redirect to="/dashboard"/>)}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    currentUser: state.auth.currentUser,
    currentApplication: state.applications.currentApplication
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout,
    authenticate,
    cancelAuthRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
