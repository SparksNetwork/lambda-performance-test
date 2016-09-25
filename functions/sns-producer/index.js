import aws from 'aws-sdk'
import apex from 'apex.js'
import {fetchItems} from "../../lib/fetchItems";
import {stats} from "../../lib/stats";

const sns = new aws.SNS()

export default apex(event => {
  const start = Date.now()
  const promises = []

  for (let i = 0; i < 100; i++) {
    const timestamp = Date.now()

    promises.push(
      sns.publish({
        Message: JSON.stringify({
          index: i,
          timestamp
        }),
        TopicArn: process.env.TOPIC_ARN
      }).promise()
        .then(() => ({index: i, timestamp}))
    )
  }

  return Promise.all(promises)
    .then(function(items) {
      return fetchItems(items)
    })
    .then(function(items) {
      return stats(start, items)
    })
})