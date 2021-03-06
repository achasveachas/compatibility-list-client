import { reset, SubmissionError } from 'redux-form';
import ApiServices from '../../services/Api'

// Actions

const authRequest = () => {
  return {
    type: 'AUTHENTICATION_REQUEST',
  }
}

export const cancelAuthRequest = () => {
  return {
    type: 'CANCEL_AUTHENTICATION_REQUEST',
  }
}

const authSuccess = (user, token) => {
  return {
    type: 'AUTHENTICATION_SUCCESS',
    user: user,
    token: token
  }
}

export const authFailure = (errors) => {
  return {
    type: 'AUTHENTICATION_FAILURE',
    errors: errors
  }
}


// async functions

export const signup = (user, router, token) => {
  return dispatch => {
    dispatch(authRequest())
    return ApiServices.post('/users', user, token)
      .then(response => {
        const { user } = response
        alert("User: " + user.username + " has been successfully created.")
        router.history.replace('/dashboard')
      })
      .catch((errors) => {
        console.log(errors)
        throw new SubmissionError(errors)
      })
  }
}

export const login = (user, router) => {
  return dispatch => {
    dispatch(authRequest());
    return ApiServices.post(`/auth`, user)
      .then(response => {
        const { user, token } = response;
        localStorage.setItem('token', token);
        dispatch(reset('login'));
        dispatch(authSuccess(user, token))
        router.history.replace('/dashboard');
      })
      .catch((errors) => {
        console.log(errors)
        dispatch(authFailure(errors))
        throw new SubmissionError(errors)
      })
  }
}

export const authenticate = (token) => {
  return dispatch => {
    dispatch(authRequest())
    return ApiServices.post('/auth/refresh', null, token)
      .then(response => {
        const { user, token } = response
        localStorage.setItem('token', token)
        dispatch(authSuccess(user, token))
      })
      .catch((errors) => {
        console.log(errors);
        dispatch(authFailure(errors))
        localStorage.removeItem('token')
      })
  }
}

export const logout = (router) => {
  localStorage.removeItem('token')
  router.history.replace('/')
  return { type: 'LOGOUT' }
}
