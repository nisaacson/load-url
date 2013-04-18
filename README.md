# Load URL
Load a given url using curl and a path to a cookie jar file on disk.

# Installation

```bash
npm install -S load-url
```

# Usage

```js
var inspect = require('eyespect').inspector();
var loadURL = require('load-url')
var data = {
  url: 'https://www.google.com',
  cookiePath: '/path/to/curl/cookie/jar/file.txt',
  args: ['--insecure'] // optional arguments to pass to the spawned curl command
}
loadURL(data, function (err, reply) {
  if (err) {
    console.log(err.stack)
    delete err.stack
    inspect(err, 'error loading url with curl')
    return
  }
  var stdout = reply.stdout
  var stderr = reply.stderr
  inspect(stdout,'curl stdout')
  inspect(stderr,'curl stdout')
})
```

# Test

```bash
# install development dependencies
npm install
# run tests
npm test
```
