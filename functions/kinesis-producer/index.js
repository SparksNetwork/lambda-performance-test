import aws from 'aws-sdk'
import apex from 'apex.js'
import {fetchItems} from "../../lib/fetchItems";
import {stats} from "../../lib/stats";

export default apex(event => {
  const start = Date.now()
  const kinesis = new aws.Kinesis()

  const params = {
    Records: [],
    StreamName: process.env.KINESIS_STREAM
  }
  const items = []

  for (let i = 0; i < 100; i++) {
    const item = {
      index: i,
      timestamp: Date.now()
    }

    items.push(item)
    params.Records.push({
      Data: new Buffer(JSON.stringify(item)),
      PartitionKey: String(i)
    })
  }

  return kinesis.putRecords(params).promise()
    .then(() => fetchItems(items))
    .then(items => stats(start, items))
})