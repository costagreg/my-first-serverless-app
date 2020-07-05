import configureStore from 'redux-mock-store'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import thunk from 'redux-thunk'
import { signup, signupError } from '../signup'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

jest.mock('amazon-cognito-identity-js', () => ({
  CognitoUserPool: jest.fn(function () {
    this.getCurrentUser = jest.fn().mockReturnValue('cognitouserpool')
    this.signUp = jest.fn((email, password, attributes, _, callback) => {
      callback(undefined, {
        user: {
          getUsername: jest.fn().mockReturnValue('cognitousername'),
        },
      })
    })
  }),
  CognitoUserAttribute: jest.fn((attribute) => attribute),
}))

describe('signup', () => {
  beforeEach(() => {
    CognitoUserPool.returnError = ''
    jest.clearAllMocks()
  })

  describe('signupValidationError', () => {
    it('dispatchs SET_SIGNUP_ERROR', () => {
      const store = mockStore({
        appConfig: {
          userPoolId: 'userPoolId',
          userPoolClientId: 'userPoolClientId',
        },
      })
      store.dispatch(signupError('Password does not match'))

      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'SET_SIGNUP_ERROR',
        error: 'Password does not match',
      })
    })
  })

  describe('signup', () => {
    describe('cognit returns success', () => {
      it('dispatchs SET_SIGNUP_SUCCESS', () => {
        const store = mockStore({
          appConfig: {
            userPoolId: 'userPoolId',
            userPoolClientId: 'userPoolClientId',
          },
        })

        const userEmail = 'test@gmail.com'
        const userPassword = 'password'

        store.dispatch(signup('test@gmail.com', 'password'))

        const actions = store.getActions()

        expect(CognitoUserPool).toHaveBeenCalledWith({
          UserPoolId: 'userPoolId',
          ClientId: 'userPoolClientId',
        })

        expect(CognitoUserPool.mock.instances[0].signUp).toHaveBeenCalledWith(
          userEmail,
          userPassword,
          [{ Name: 'email', Value: 'test@gmail.com' }],
          null,
          expect.any(Function)
        )

        expect(actions[0]).toEqual({
          type: 'SET_SIGNUP_SUCCESS',
          user: 'cognitousername',
        })
      })
    })

    describe('Cognito return an error', () => {
      beforeEach(() => {
        CognitoUserPool.mockImplementation(function() {
          this.signUp = jest.fn((email, password, attributes, _, callback) => {
            callback({
              message: 'test error',
            })
          })
        })
      })

      it('dispatchs SET_SIGNUP_ERROR', () => {
        const store = mockStore({
          appConfig: {
            userPoolId: 'userPoolId',
            userPoolClientId: 'userPoolClientId',
          },
        })

        const userEmail = 'test@gmail.com'
        const userPassword = 'password'

        store.dispatch(signup('test@gmail.com', 'password'))

        const actions = store.getActions()

        expect(CognitoUserPool).toHaveBeenCalledWith({
          UserPoolId: 'userPoolId',
          ClientId: 'userPoolClientId',
        })

        expect(CognitoUserPool.mock.instances[0].signUp).toHaveBeenCalledWith(
          userEmail,
          userPassword,
          [{ Name: 'email', Value: 'test@gmail.com' }],
          null,
          expect.any(Function)
        )

        expect(actions[0]).toEqual({
          type: 'SET_SIGNUP_ERROR',
          error: 'test error',
        })
      })
    })
  })
})
