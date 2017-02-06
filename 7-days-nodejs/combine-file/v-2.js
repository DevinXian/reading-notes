/**
 * Created by wind on 17-1-20.
 * 归并文件
 */
const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')

const MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
}

function main(argv) {
	const config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
		root = config.root || '.',
		port = config.port || 80

	http.createServer(function (req, res) {
		const urlInfo = parseURL(root, req.url);

		//validate -> create output stream
		validateFiles(urlInfo.pathnames, (err, pathnames) => {
			if (err) {
				res.writeHead(404)
				res.end(err.message)
			} else {
				res.writeHead(200, {'Content-Type': urlInfo.mime})
				outputFiles(pathnames, res)
			}
		})
	}).listen(port, function () {
		console.log('server started on port ' + port)
	})
}

function outputFiles(pathnames, writer) {
	const next = (i, len) => {
		if (i < len) {
			const s = fs.createReadStream(pathnames[i])
			s.pipe(writer, {end: false})
			s.on('end', () => {
				next(i + 1, len)
			})
		} else {
			writer.end()
		}
	}
	next(0, pathnames.length)
}

function validateFiles(pathnames, callback) {
	const next = function (i, len) {
		if (i < len) {
			fs.stat(pathnames[i], (err, stats)=> {
				if (err) return callback(err)
				if (!stats.isFile()) {
					callback(new Error('Not Found', pathnames[i] + ' is not a file'))
				} else {
					next(i + 1, len)
				}
			})
		} else {
			callback(null, pathnames)
		}
	}
	next(0, pathnames.length)
}

function parseURL(root, url) {
	let base, pathnames, parts

	if (url.indexOf('??') < 0) {
		url = url.replace('/', '/??')
	}
	parts = url.split('??')
	base = parts[0]
	pathnames = parts[1]
		.split(',')
		.map(value => path.join(root, base, value))

	return {
		mime: MIME[path.extname(pathnames[0])] || 'text/plain',
		pathnames: pathnames
	}
}

main(process.argv.slice(2))

