import { nanoid } from 'nanoid'

const urlsController = (documentClient, tableName) => ({
  addUrl: (req, res) => {
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
          res.status(500).send({
            success: false,
            message: 'Oops something went wrong. Please retry again',
            error: err,
          })
        } else {
          res.send({
            success: true,
            message: 'Url added',
            result: {
              id,
            },
          })
        }
      }
    )
  },
  redirectUrl: (req, res) => {
    const { id } = req.params

    documentClient.update(
      {
        TableName: tableName,
        Key: {
          Id: id,
        },
        UpdateExpression: 'SET #count = #count + :incr',
        ExpressionAttributeNames: { '#count': 'Count' },
        ExpressionAttributeValues: {
          ':incr': 1,
        },
        ReturnValues: 'ALL_NEW',
      },
      function (err, result) {
        if (err) {
          res.status(404).send({
            success: false,
            message: 'Oops we cannot find this url.',
            error: err,
          })
        } else {
          if (result && result.Attributes && result.Attributes.Url) {
            res.redirect(result.Attributes.Url)
          }
        }
      }
    )
  },
})

export default urlsController
