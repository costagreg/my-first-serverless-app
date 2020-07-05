import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shortUrl } from '../shortener'
import mockAxios from 'axios'

jest.mock('axios')

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

const apiUrl = 'https://mydomain.com'
const initialState = {
  appConfig: {
    apiUrl,
  },
}

describe('shortener', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('shortUrl', () => {
    beforeEach(() => {
      mockAxios.post = jest.fn().mockResolvedValue({
        data: {
          result: { id: 'mockid' },
        },
      })
    })

    describe('It is a valid URL', () => {
      it('should call the API to add the url', async () => {
        const store = mockStore(initialState)
        await store.dispatch(shortUrl('https://test.com'))
        const actions = store.getActions()

        expect(mockAxios.post).toHaveBeenCalledWith(
          'https://mydomain.com/api/url',
          {
            url: 'https://test.com',
          }
        )

        expect(actions[0]).toEqual({
          type: 'SET_SHORTENER_URL',
          urlShortened: 'https://mydomain.com/mockid',
        })
      })

      describe('Does not contain a protocol', () => {
        it('adds https and call api', async () => {
          const store = mockStore(initialState)
          await store.dispatch(shortUrl('www.costagreg.com'))
          const actions = store.getActions()

          expect(mockAxios.post).toHaveBeenCalledWith(
            'https://mydomain.com/api/url',
            {
              url: 'https://www.costagreg.com',
            }
          )

          expect(actions[0]).toEqual({
            type: 'SET_SHORTENER_URL',
            urlShortened: 'https://mydomain.com/mockid',
          })
        })
      })
    })

    describe('It is not a valid URL', () => {
      it('does not call the api', async () => {
        const store = mockStore(initialState)
        await store.dispatch(shortUrl('notvalid'))
        const actions = store.getActions()

        expect(mockAxios.post).toHaveBeenCalledTimes(0)

        expect(actions[0]).toEqual({
          type: 'SET_SHORTENER_ERROR',
          error: 'Url not valid',
        })
      })
    })

    describe('Something went wrong on the call', () => {
      beforeEach(() => {
        mockAxios.post = jest.fn().mockRejectedValue({
          error: 'Something really wrong :)',
        })
      })

      it('should show an error', async () => {
        const store = mockStore(initialState)
        await store.dispatch(shortUrl('www.anotherdomain.com'))
        const actions = store.getActions()

        expect(mockAxios.post).toHaveBeenCalledWith(
          'https://mydomain.com/api/url',
          {
            url: 'https://www.anotherdomain.com',
          }
        )
        expect(actions[0]).toEqual({
          type: 'SET_SHORTENER_ERROR',
          error: 'Ops something went wrong',
        })
      })
    })
  })
})
