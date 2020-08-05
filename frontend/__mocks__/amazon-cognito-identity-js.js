export const CognitoUserPool = jest.fn(function () {
  this.getCurrentUser = jest.fn().mockReturnValue({
    getSession: () => {}
  })
  this.signUp = jest.fn((email, password, attributes, _, callback) => {
    callback(undefined, {
      user: {
        getUsername: jest.fn().mockReturnValue('cognitousername'),
      },
    })
  })
})

export const CognitoUserAttribute = jest.fn((attribute) => attribute)