const Readable = require('stream').Readable

class ToReadable extends Readable {
  constructor(iterator) {
    super()
    this.iterator = iterator
  }

  _read() {
    const res = this.iterator.next()
    if (res.done) {
      return this.push(null)
    }
    setTimeout(() => {
      this.push(res.value + '\n')
    }, 0)
  }
}

const iterator = (limit => {
  return {
    next: () => {
      if (limit--) {
        return { done: false, value: limit + Math.random() }
      }
      return { done: true }
    }
  }
})(1e2)

// module.exports = ToReadable
const readable = new ToReadable(iterator)

readable.on('data', data => process.stdout.write(data))
readable.on('end', () => process.stdout.write('Done'))

