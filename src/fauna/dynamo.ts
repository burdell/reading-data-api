import AWS, { DynamoDB } from 'aws-sdk'
import type { Book } from '../types'

if (process.env.NODE_ENV === 'local') {
  const credentials = new AWS.SharedIniFileCredentials()
  AWS.config.credentials = credentials
  AWS.config.update({ region: 'us-east-1' })
}

const db = new DynamoDB.DocumentClient()
export async function getDynamoData() {
  const result = await db.scan({ TableName: 'Books' }).promise()
  return result.Items as Book[]
}
