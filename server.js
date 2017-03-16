const fs = require('fs')
const spawn = require('child_process').spawn
const replace = require('replace')
var logFile = fs.createWriteStream('test.txt', { flags: 'a' })

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
    console.log(data.toString().replace(/\n/, ''))
    logFile.write(data.toString().replace())
  })
  .on('error', function (err) { console.log(err) })
  .on('close', function () {
    spawn('open', ['http://localhost:8888/MAMP'])
    console.log('\nServer is running at localhost:8888')
    console.log('run "node server stop" to close server connection\n')
  })
  // TODO
  // Run "stop" script on exit
}

mampShell.stop = function () {
  spawn('sh', ['/Applications/MAMP/bin/stop.sh'])
  .stdout.on('data', function (data) {
    console.log(data.toString())
  })
  .on('error', function (err) {
    console.log(err)
  })
}

if (process.argv[2] === 'start') {
  mampShell.start()
} else if (process.argv[2] === 'stop') {
  mampShell.stop()
  console.log('stop it')
} else if (process.argv[2] === 'path') {
  mampShell.projectPath(project.root)
  console.log('we\'ll need another arg probs')
} else {
  console.log(`\nSORRY: "${process.argv[2]}" is not a valid command :'(\n`)
  console.log(`Valid commands`)
  console.log(`---------------------------------`)
  console.log(`start | starts MAMP server`)
  console.log(`stop  | kills running MAMP server`)
  console.log(`path  | sets your document path\n`)
}
