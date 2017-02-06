/**
 * Created by wind on 17-1-23.
 */
const fs = require('fs');
const path = require('path');

function travel(dir, callback, finish) {
	fs.readdir(dir, function (err, files) {
		if (err) return finish(err);

		(function next(i) {
			if (i < files.length) {
				const _path = path.join(dir, files[i]);

				fs.stat(_path, function (err, stats) {
					if (err) return finish(err);

					if (stats.isDirectory()) {
						travel(_path, callback, function () {
							next(i + 1);
						});
						return;
					}

					callback(_path, function () {
						next(i + 1);
					});
				});
			} else {
				finish && finish(null, 'travel done');
			}
		})(0)
	});
}

travel('./read-stream', function (file, callback) {
	console.info(file);
	callback && callback();
}, function (err, result) {
	if (err) return console.error(err);
	console.log(result || 'done');
});