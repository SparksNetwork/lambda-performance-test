import aws from 'aws-sdk'
import apex from 'apex.js'

export default apex(event => {
  const kinesis = new aws.Kinesis()

  const params = {
    Records: [],
    StreamName: process.env.KINESIS_STREAM
  }

  for (let i = 0; i < 100; i++) {
    params.Records.push({
      Data: new Buffer(JSON.stringify({
        index: i,
        timestamp: Date.now()
      })),
      PartitionKey: String(i)
    })
  }

  return kinesis.putRecords(params).promise()
})