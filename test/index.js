var test = require('tape')
var createSbot = require('./create-server')

var sbot = createSbot()

test('stuff', function (t) {
    sbot.publish({
        type: 'post',
        text: 'Hello, world! #my-tag ok #tag-again'
    }, function (err, msg) {
        // console.log('**post 2', err, msg)
        if (err) throw err
        sbot.tags.get(function (err, data) {
            console.log('**get**', err, data)
            t.end()
        })
    })
})

