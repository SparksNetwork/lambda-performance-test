import aws from 'aws-sdk'
const db = new aws.DynamoDB()

export function fetchItems(items) {
  const requestItems = {}
  requestItems[process.env.TABLE_NAME] = {
    Keys: []
  }

  for (let i = 0; i < 100; i++) {
    requestItems[process.env.TABLE_NAME].Keys.push({
      index: {N: String(i)}
    })
  }

  return db.batchGetItem({
    RequestItems: requestItems
  }).promise()
    .then(data => {
      return data.Responses[process.env.TABLE_NAME]
        .map(returnedItem => {
          return {
            index: Number(returnedItem.index.N),
            timestamp: Number(returnedItem.timestamp.N),
            duration: Number(returnedItem.duration.N)
          }
        })
    })
    .then(returnedItems => {
      const hasAll = items.every(item =>
        returnedItems.filter(ritem => ritem.index === item.index && ritem.timestamp === item.timestamp)
          .length > 0
      )

      console.log('has all?', hasAll)

      if (hasAll) {
        return returnedItems
      } else {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetchItems(items).then(resolve).catch(reject)
          }, 5000)
          console.log('waiting 5s')
        })
      }
    })
}
