const Duplex = require('stream').Duplex
const duplex = new Duplex()

duplex._read = function () {
  this._readNum = this._readNum || 0
  if (this._readNum > 1) {
    this.push(null)
  } else {
    this.push('' + (this._readNum++))
  }
}

duplex._write = (buf, enc, next) => {
  process.stdout.write('_write ' + buf.toString() + '\n')
  next()
}

duplex.on('data', data => console.log('on data: ', data.toString()))
duplex.write('a')
duplex.write('b')

duplex.end()
