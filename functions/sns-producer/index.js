import aws from 'aws-sdk'
import apex from 'apex.js'

export default apex(event => {
  const sns = new aws.SNS()
  const promises = []

  for (let i = 0; i < 100; i++) {
    promises.push(
      sns.publish({
        Message: JSON.stringify({
          index: i,
          timestamp: Date.now()
        }),
        TopicArn: process.env.TOPIC_ARN
      }).promise()
    )
  }

  return Promise.all(promises)
})