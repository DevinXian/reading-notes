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

		combineFiles(urlInfo.pathnames, (err, data) => {
			if (err) {
				res.writeHead(404)
				res.end(err.message)
			} else {
				res.writeHead(200, {
					'Content-Type': urlInfo.mime
				})
				res.end(data)
			}
		})
	}).listen(port, function () {
		console.log('server started on port ' + port)
	})
}

function combineFiles(pathnames, callback) {
	const output = [];

	const next = (i, len) => {
		if (i < len) {
			fs.readFile(pathnames[i], (err, data) => {
				if (err) return callback(err)
				output.push(data)
				next(i + 1, len)
			})
		} else {
			callback(null, Buffer.concat(output))
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

