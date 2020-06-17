import urlsController from './urlsController'

jest.mock('nanoid', () => ({
  nanoid: () => 'nanoIdMock',
}))

const DYNAMODB_TABLE = DYNAMODB_TABLE

describe('urlsController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const res = {
    send: jest.fn(() => {}),
    status: jest.fn(() => ({
      send: res.send,
    })),
    redirect: jest.fn(() => {}),
  }

  describe('addUrl', () => {
    const putRequest = {
      ConditionExpression: 'attribute_not_exists(#Id)',
      ExpressionAttributeNames: {
        '#Id': 'Id',
      },
      Item: {
        Count: 0,
        Id: 'nanoIdMock',
        Url: 'http://www.example.com',
      },
      TableName: DYNAMODB_TABLE,
    }

    it('adds a new url without any errors and returns 200', () => {
      const documentClient = {
        put: jest.fn((_, callback) => {
          callback(undefined, {})
        }),
      }

      const urlsControllerMocked = urlsController(
        documentClient,
        DYNAMODB_TABLE
      )

      urlsControllerMocked.addUrl(
        { body: { url: 'http://www.example.com' } },
        res
      )

      expect(documentClient.put).toHaveBeenCalledTimes(1)
      expect(documentClient.put).toHaveBeenCalledWith(
        putRequest,
        expect.any(Function)
      )

      expect(res.send).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledWith({
        data: {
          id: 'nanoIdMock',
        },
        message: 'Url added',
        success: true,
      })
    })

    describe('Something goes wrong in dynamodb', () => {
      it('returns 500 and the error', () => {
        const documentClient = {
          put: jest.fn((_, callback) => {
            callback({ message: 'Something wrong' })
          }),
        }

        const urlsControllerMocked = urlsController(
          documentClient,
          DYNAMODB_TABLE
        )

        urlsControllerMocked.addUrl(
          { body: { url: 'http://www.example.com' } },
          res
        )

        expect(documentClient.put).toHaveBeenCalledTimes(1)
        expect(documentClient.put).toHaveBeenCalledWith(
          putRequest,
          expect.any(Function)
        )

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledTimes(1)
        expect(res.send).toHaveBeenCalledWith({
          error: {
            message: 'Something wrong',
          },
          message: 'Oops something went wrong. Please retry again',
          success: false,
        })
      })
    })
  })

  describe('redirectUrl', () => {
    const updateRequest = {
      TableName: DYNAMODB_TABLE,
      Key: {
        Id: 'urlIdMock',
      },
      UpdateExpression: 'SET #count = #count + :incr',
      ExpressionAttributeNames: { '#count': 'Count' },
      ExpressionAttributeValues: {
        ':incr': 1,
      },
      ReturnValues: 'ALL_NEW',
    }

    it('redirects to the url if it is found', () => {
      const documentClient = {
        update: jest.fn((_, callback) => {
          callback(undefined, {
            Attributes: {
              Url: 'http://www.anotherexample.com',
            },
          })
        }),
      }

      const urlsControllerMocked = urlsController(
        documentClient,
        DYNAMODB_TABLE
      )

      urlsControllerMocked.redirectUrl({ params: { id: 'urlIdMock' } }, res)

      expect(documentClient.update).toHaveBeenCalledTimes(1)
      expect(documentClient.update).toHaveBeenCalledWith(
        updateRequest,
        expect.any(Function)
      )


      expect(res.redirect).toHaveBeenCalledTimes(1)
      expect(res.redirect).toHaveBeenCalledWith('http://www.anotherexample.com')
    })

    describe('The shortned url is not present', () => {
      it('returns 404 and the error', () => {
        const documentClient = {
          update: jest.fn((_, callback) => {
            callback({
              message: 'Not found',
            })
          }),
        }

        const urlsControllerMocked = urlsController(
          documentClient,
          DYNAMODB_TABLE
        )

        urlsControllerMocked.redirectUrl({ params: { id: 'urlIdMock' } }, res)

        expect(documentClient.update).toHaveBeenCalledTimes(1)
        expect(documentClient.update).toHaveBeenCalledWith(
          updateRequest,
          expect.any(Function)
        )

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.send).toHaveBeenCalledTimes(1)
        expect(res.send).toHaveBeenCalledWith({
          error: {
            message: 'Not found',
          },
          message: 'Oops we cannot find this url.',
          success: false,
        })
      })
    })
  })
})
