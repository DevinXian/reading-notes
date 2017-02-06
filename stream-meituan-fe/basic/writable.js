const Writable = require('stream').Writable

const writable = new Writable()

writable._write = (data, enc, next) => {
  process.stdout.write(data.toString().toUpperCase())
  process.nextTick(next)
}

writable.on('finish', () => process.stdout.write('Done'))

writable.write('a\n')
writable.write('b\n')
writable.write('c\n')
writable.end()//emit event finish
