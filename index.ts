var fs = require('fs')
var requirejs = require.resolve('requirejs')
var stripDebug = require('strip-debug')
var spawn = require('cross-spawn')
var glob = require('glob')

/**
 * @param {string} configPath rjs config path
 * @param {string} output output path default to dist
 */
export default function (configPath: string, output: string) {
	configPath = configPath || 'app.build.js'
	output = output || 'dist'
	var rjs = spawn(requirejs, ['-o', configPath])

	rjs.stdout.on('data', function (data) {
		console.log('stdout: ' + data)
	})

	rjs.stderr.on('data', function (data) {
		console.log('stderr: ' + data)
	})

	rjs.on('close', function (code) {
		console.log('child process exited with code ' + code)
		if (code === 0) {
			// options is optional
			/**
			 * @param {Array} {files}
			 */
			glob(output + '/**/*.js', function (err, files) {
				// files is an array of filenames.
				// If the `nonull` option is set, and nothing
				// was found, then files is ["**/*.js"]
				// er is an error object or null.
				if (!err) {
					files.forEach(function (file) {
						var c = fs.readFileSync(file)
						var d = stripDebug(c)
						fs.writeFileSync(file, d)
					})
					console.log('strip debug done ')
				}
			})
		}
	})
}
