import { resolve } from 'path'
import AWS, { DynamoDB } from 'aws-sdk'
import { BatchWriteItemInput } from 'aws-sdk/clients/dynamodb'
import uuid from 'uuid/v1'

import { BookWithoutId } from '../types'

if (process.env.NODE_ENV === 'local') {
  const credentials = new AWS.SharedIniFileCredentials()
  console.log(credentials)
  AWS.config.credentials = credentials
  AWS.config.update({ region: 'us-east-1' })
}

const db = new DynamoDB.DocumentClient()
export async function addToDb(books: BookWithoutId[]): Promise<number> {
  const chunks = getBookChunks(books)
  let successfulBooks = 0

  return new Promise((resolve, reject) => {
    chunks.forEach((chunk, index) => {
      db.batchWrite(getDynamoInput(chunk), (err, response) => {
        if (err) {
          console.log(err)
          // console.error(
          //   `[GOODREADS SYNC] DB Write Error: ${chunk.map((c) => c)}`
          // )
          return
        }

        const { UnprocessedItems } = response
        if (UnprocessedItems) {
          successfulBooks += chunk.length - Object.keys(UnprocessedItems).length
        }

        if (index === chunks.length) {
          resolve(successfulBooks)
        }
      })
    })
  })
}

const UPLOAD_NUMBER = 25
function getBookChunks(books: BookWithoutId[]): BookWithoutId[][] {
  const chunkNumber = Math.ceil(books.length / UPLOAD_NUMBER)
  let currentChunk = 0
  const chunks = []
  while (currentChunk < chunkNumber) {
    const chunkStart = currentChunk * UPLOAD_NUMBER
    chunks.push(books.slice(chunkStart, chunkStart + UPLOAD_NUMBER))
    currentChunk += 1
  }
  return chunks
}

function getDynamoInput(books: BookWithoutId[]): BatchWriteItemInput {
  const putRequests = books.map(getAttributeMap)
  return {
    RequestItems: {
      Books: putRequests.map((request) => ({
        PutRequest: {
          Item: request
        }
      }))
    }
  }
}

function getAttributeMap(book: BookWithoutId) {
  const input: any = {
    id: uuid()
  }
  const keys = Object.keys(book)
  keys.forEach((key) => {
    const dbValue = (book as any)[key]
    if (dbValue) {
      input[key] = dbValue.toString()
    }
  })

  return input
}
