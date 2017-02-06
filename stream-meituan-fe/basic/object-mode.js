const Readable = require('stream').Readable

// const readable = Readable()
const readable = Readable({objectMode: true})

console.log(readable._read.toString())
readable.push('a')
readable.push('b')
readable.push(null)

readable.on('data', data => console.log(data))
