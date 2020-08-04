import * as AWS from 'aws-sdk/global'

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js'

export const login = (email, password) => (dispatch, getState) => {
  const state = getState()

  const authenticationData = {
    Username: email,
    Password: password,
  }

  const authenticationDetails = new AuthenticationDetails(authenticationData)

  const userPool = new CognitoUserPool({
    UserPoolId: state.appConfig.userPoolId,
    ClientId: state.appConfig.userPoolClientId,
  })

  const userData = {
    Username: email,
    Pool: userPool,
  }

  const cognitoUser = new CognitoUser(userData)

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      const accessToken = result.getAccessToken().getJwtToken()

      AWS.config.region = 'us-east-1'

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:6448bef8-9f84-4a64-a22b-d28aba49998f', // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          [`cognito-idp.us-east-1.amazonaws.com/${state.appConfig.userPoolId}`]: result
            .getIdToken()
            .getJwtToken(),
        },
      })

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error)
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3()
          console.log('Successfully logged!')
        }
      })
    },
    onFailure: function (err) {
      alert(err.message || JSON.stringify(err))
    },
  })
}

export const getCurrentUser = () => (dispatch, getState) => {
  const state = getState()

  const poolData = {
    UserPoolId: state.appConfig.userPoolId,
    ClientId: state.appConfig.userPoolClientId,
  }

  const userPool = new CognitoUserPool(poolData)

  const cognitoUser = userPool.getCurrentUser()

  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      // console.log('session validity: ' + session.isValid())

      // NOTE: getSession must be called to authenticate user before calling getUserAttributes
      // cognitoUser.getUserAttributes(function(err, attributes) {
      // 	if (err) {
      // 		// Handle error
      // 	} else {
      // 		// Do something with attributes
      // 		console.log(attributes)
      // 	}
      // })

      cognitoUser.getUserData(function (err, { Username }) {
        if (err) {
          alert(err.message || JSON.stringify(err))
          return
        }
        dispatch({ type: 'SET_USER', user: Username })
      })

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:6448bef8-9f84-4a64-a22b-d28aba49998f', // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          [`cognito-idp.us-east-1.amazonaws.com/${state.appConfig.userPoolId}`]: session
            .getIdToken()
            .getJwtToken(),
        },
      })

      // Instantiate aws sdk service objects now that the credentials have been updated.
      // example: var s3 = new AWS.S3()
    })
  }
}
