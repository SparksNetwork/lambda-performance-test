import aws from 'aws-sdk'
import apex from 'apex.js'

const db = new aws.DynamoDB()

function consumeMessage(message) {
  const duration = (Date.now() - message.timestamp) / 1000

  const item = {
    index: {
      N: String(message.index)
    },
    timestamp: {
      N: String(message.timestamp)
    },
    duration: {
      N: String(duration)
    }
  }

  return db.putItem({
    Item: item,
    TableName: process.env.TABLE_NAME
  }).promise()
}

function consumeKinesis(record) {
  const data = new Buffer(record.data, 'base64')

  try {
    const message = JSON.parse(data)
    return consumeMessage(message)
  } catch (err) {
    return Promise.reject(err)
  }
}

function consumeRecord(record) {
  return consumeKinesis(record.kinesis)
}

export default apex(event => {
  return Promise.all(
    event.Records.map(consumeRecord)
  )
})