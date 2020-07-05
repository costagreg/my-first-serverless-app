import configureStore from 'redux-mock-store'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import thunk from 'redux-thunk'
import { signup } from '../signup'

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
  describe('signup', () => {
    describe('cognit returns success', () => {
      it('dispatchs SIGNUP_SUCCESS', () => {
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
          type: 'SIGNUP_SUCCESS',
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

      it('dispatchs SIGNUP_ERROR', () => {
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
          type: 'SIGNUP_ERROR',
          error: 'test error',
        })
      })
    })
  })
})
