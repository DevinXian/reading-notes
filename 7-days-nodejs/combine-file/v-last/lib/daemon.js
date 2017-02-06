const child = require('child_process')

let worker

function spawn(server, config) {
	worker = child.spawn('node', [server, config])
	worker.on('exit', code => {
		console.log('worker exited', code)
		if (code !== 0) {
			spawn(server, config)
		}
	})
}

function main(argv) {
	//此处不能直接调用server.js，路径相对于bin目录
	spawn('../lib/server.js', argv[0])
	process.on('SIGTERM', () => {
		worker.kill()
		process.exit(0)
	})
}

main(process.argv.slice(2))