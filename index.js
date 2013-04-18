var inspect = require('eyespect').inspector();
var spawn = require('child_process').spawn;
var rk = require('required-keys');
module.exports = function (data, cb) {
  var keys = ['cookiePath', 'url']
  var err = rk.truthySync(data, keys)
  if (err) {
    return cb({
      message: 'error loading url, missing key in data',
      error: err,
      stack: new Error().stack
    })
  }
  var url = data.url
  var cookiePath = data.cookiePath
  var args = data.args || []
  args = args.concat([
    '--cookie',
    cookiePath,
    url
  ])
  var cmd = 'curl'
  var curl = spawn(cmd, args)
  // curl.stderr.setEncoding('utf8')
  curl.stdout.setEncoding('utf8')
  var stdout = ''
  var stderr = ''
  curl.stdout.on('data', function (data) {
    stdout += data
  })
  curl.stderr.on('data', function (data) {
    stderr += data
  })
  curl.on('exit', function(code) {
    if (code != 0) {
      return cb({
        message: 'load url failed',
        error: 'bad return code from curl when fetching url',
        url: url,
        stderr: stderr,
        stdout: stdout,
        code: code,
        stack: new Error().stack
      })
    }
    var output = {
      stdout: stdout,
      stderr: stderr
    }
    cb(null, output)
  })

}
