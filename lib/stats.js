export function stats(start, items) {
  const durations = items.map(i => i.duration)

  const mean = durations.reduce((acc, d) => acc + d, 0) / durations.length
  const median = durations.sort()[Math.ceil(durations.length/2)]
  const stddev = Math.sqrt(durations.reduce((acc, d) =>
      acc + Math.pow(d - mean, 2)
    ) / durations.length)
  const total = (Date.now() - start) / 1000

  return {
    mean, median, stddev, total
  }
}

