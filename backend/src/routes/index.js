import express from 'express'
import { nanoid } from 'nanoid'

export default (documentClient) => {
  const router = express.Router()
  const tableName = process.env.TABLE_NAME || 'DEV_TABLE'

  router.post('/api/url', function (req, res, next) {
    const { url } = req.body
    const id = nanoid(5)

    documentClient.put(
      {
        TableName: tableName,
        Item: {
          Id: id,
          Url: url,
          Count: 0,
        },
        ExpressionAttributeNames: {
          '#Id': 'Id',
        },
        ConditionExpression: 'attribute_not_exists(#Id)',
      },
      function (err, result) {
        if (err) {
          //TO-DO: handle collision better
          res.status(500).send({
            success: false,
            message: 'Oops something went wrong. Please retry again',
          })
        } else {
          res.send({
            success: true,
            message: 'Url added',
            data: {
              id,
            }
          })
        }
      }
    )
  })

  router.get('/:id', function (req, res, next) {
    const { id } = req.params

    documentClient.update(
      {
        TableName: tableName,
        Key: {
          Id: id,
        },
        UpdateExpression: 'SET #count = #count + :incr',
        ExpressionAttributeNames: {'#count' : 'Count'},
        ExpressionAttributeValues: {
          ':incr' : 1,
        },
        ReturnValues: 'ALL_NEW'
      },
      function (err, result) {
        if (err) {
          res.status(500).send({
            success: false,
            message: 'Oops something went wrong. Please retry again',
            error: err
          })
        } else {
          if(result && result.Attributes && result.Attributes.Url ){
            res.redirect(result.Attributes.Url)
          }
        }
      }
    )
  })

  return router
}
