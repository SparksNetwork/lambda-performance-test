import aws from 'aws-sdk'
import apex from 'apex.js'

const db = new aws.DynamoDB()

function consumeMessage(message) {
  return db.putItem({
    Item: {
      index: {
        S: message.index
      },
      timestamp: {
        S: message.timestamp
      },
      duration: {
        S: String(Date.now - Number(message.timestamp))
      }
    },
    TableName: process.env.TABLE_NAME
  }).promise()
}

function consumeSnsRecord(record) {
  const rawMessage = record.Sns.Message

  try {
    const message = JSON.parse(rawMessage)
    return consumeMessage(message)
  } catch (err) {
    return Promise.reject(err)
  }
}

export default apex(event => {
  return Promise.all(
    event.Records.map(consumeSnsRecord)
  )
})
