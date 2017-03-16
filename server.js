const fs = require('fs')
const spawn = require('child_process').spawn
const replace = require('replace')

var mampShell = {}

var project = {
  root: '/Users/stuartpearman/Code/wordpress-builds/vaquero',
  mampInstall: '/Applications/MAMP/conf/apache/httpd.conf'
}

mampShell.projectPath = function (pwd, options) {
  if (typeof options === 'object') {
  	options.installPath = option.installPath ? option.installPath : '/Applications/MAMP/conf/apache/httpd.conf'
  } else {
  	options = {}
  	options.installPath = '/Applications/MAMP/conf/apache/httpd.conf'
  }
  replace({
	  regex: '[ ,\t]*DocumentRoot {1,8}".*"[ ,\t]*',
	  replacement: `DocumentRoot "${pwd}"`,
	  paths: [options.installPath],
	  recursive: false,
	  silent: true
  })
}

mampShell.start = function () {
  spawn('sh', ['/Applications/MAMP/bin/start.sh'])
  .stdout.on('data', function (data) {
  	console.log(data.toString().replace(/\n*/, ''))
  })
  .on('error', function (err) { console.log(err) })
  // TODO
  // Run "stop" script on exit
  // Open up localhost:PORT/MAMP
}

mampShell.stop = function () {
  spawn('sh', ['/Applications/MAMP/bin/stop.sh'])
  .stdout.on('data', function (data) {
  	console.log(data.toString().replace('\n*', '\n'))
  })
  .on('error', function (err) {
  	console.log(err)
  })
}

// mampShell.projectPath(project.root)
// mampShell.stop()
mampShell.start()

// spawn('ls', ['-al']).stdout.on('data', function (data) { console.log(data.toString()) })
