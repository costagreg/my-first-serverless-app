import express from 'express'
import { nanoid } from 'nanoid'

export default (documentClient) => {
  const router = express.Router()
  const tableName = process.env.TABLE_NAME || 'DEV_TABLE'

  router.post('/api/url', function (req, res, next) {
    const { url } = req.body

    documentClient.put(
      {
        TableName: tableName,
        Item: {
          Id: nanoid(5),
          Url: url,
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
            message: 'Oops something went wrong. Please retry again.',
          })
        } else {
          res.send({
            success: true,
            message: 'Url added.',
          })
        }
      }
    )
  })

  return router
}
