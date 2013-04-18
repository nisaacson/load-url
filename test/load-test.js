var inspect = require('eyespect').inspector();
var should = require('should');
var path = require('path')
var loadURL = require('../')
describe('Load URL with curl', function () {
  var data
  var cookiePath = path.join(__dirname, 'data/cookie.txt')
  beforeEach(function () {
    data = {
      url: 'https://www.google.com',
      cookiePath: cookiePath
    }
  })
  it('should give error if "url" field is missing', function (done) {
    delete data.url
    loadURL(data, function (err, reply) {
      should.exist(err)
      err.error[0].key.should.eql('url')
      done()
    })
  })

  it('should give error if "cookiePath" field is missing', function (done) {
    delete data.cookiePath
    loadURL(data, function (err, reply) {
      should.exist(err)
      err.error[0].key.should.eql('cookiePath')
      done()
    })
  })

  it('should load url with default args', function (done) {
    loadURL(data, function (err, reply) {
      should.not.exist(err)
      should.exist(reply.stdout)
      should.exist(reply.stderr)
      var stdout = reply.stdout
      stdout.length.should.be.above(1000)
      done()
    })
  })

  it('should load url with custom args', function (done) {
    var args = ['-s', '-D', '-', '-o', '/dev/null']
    data.args = args
    loadURL(data, function (err, reply) {
      should.not.exist(err)
      should.exist(reply.stdout)
      should.exist(reply.stderr)
      var stdout = reply.stdout
      stdout.length.should.be.below(1000)
      done()
    })
  })
}) 
