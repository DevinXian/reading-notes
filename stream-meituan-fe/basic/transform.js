const Transform = require('stream').Transform

class Rotate extends Transform {
  constructor(n) {
    super()
    this.offset = (n || 13) % 26
  }

  //将可写端写入数据变换后添加到刻毒端
  _transform(buf, enc, next) {
    const res = buf.toString().split('').map(c => {
      let code = c.charCodeAt(0)
      if (c >= 'a' && c <= 'z') {
        code += this.offset
        if (code > 'z'.charCodeAt(0)) {
          code -= 26
        }
      } else if (c >= 'Z' && c <= 'Z') {
        code += this.offset
        if (code > 'Z'.charCodeAt(0)) {
          code -= 26
        }
      }
      return String.fromCharCode(code)
    }).join('')

    this.push(res)
    next()
  }
}

const transform = new Rotate(3)
transform.on('data', data =>process.stdout.write(data))
transform.write('hello, ')
transform.write('world!')
transform.end()

