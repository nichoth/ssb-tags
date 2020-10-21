var Sbot = require('ssb-server')
var caps = require('ssb-caps')
var ssbConfigInject = require('ssb-config/inject')
var home = require('user-home')
var path = require('path')

function start () {
    var appName = 'ssb-TEST-' + Math.random()

    process.on('exit', function () {
        rimraf.sync(path.join(home, '.' + appName))
        console.log('deleted', appName)
    }

    var config = ssbConfigInject(appName, opts)
    var keyPath = path.join(config.path, 'secret')
    config.keys = ssbKeys.loadOrCreateSync(keyPath)

    var sbot = Sbot()
        .use(require('../')({ postType: 'post' }))
        .call(null, config)

    return sbot
}

module.exports = start

