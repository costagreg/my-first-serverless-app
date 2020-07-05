import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

export const signupError = (error) => (dispatch, getState) => {
  dispatch({
    type: 'SET_SIGNUP_ERROR',
    error,
  })
}

export const signup = (email, password) => (dispatch, getState) => {
  const state = getState()

  const userPool = new CognitoUserPool({
    UserPoolId: state.appConfig.userPoolId,
    ClientId: state.appConfig.userPoolClientId,
  })

  const user = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
  ]

  return userPool.signUp(email, password, user, null, (error, result) => {
    if (error) {
      dispatch(signupError(error.message || JSON.stringify(error)))
    } else {
      dispatch({
        type: 'SET_SIGNUP_SUCCESS',
        user: result.user.getUsername(),
      })
    }
  })
}
