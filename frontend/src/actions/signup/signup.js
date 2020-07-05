import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

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
      dispatch({
        type: 'SIGNUP_ERROR',
        error: error.message || JSON.stringify(error),
      })
    } else {
      dispatch({
        type: 'SIGNUP_SUCCESS',
        user: result.user.getUsername(),
      })
    }
  })
}
