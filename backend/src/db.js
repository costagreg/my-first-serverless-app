import AWS from 'aws-sdk'

const awsRegion = process.env.AWS_REGION_NAME || 'us-east-1'

export const documentClient = new AWS.DynamoDB.DocumentClient({
  region: awsRegion,
  endpoint:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : null,
})

export const tableName = process.env.TABLE_NAME || 'DEV_TABLE'
