# ssb tags

A tag index for ssb

## install

```
npm install @nichoth/ssb-tags
```

## example
create-server
```js
function create () {
    var Sbot = require('ssb-server')

    // ...

    var sbot = Sbot
        .use(require('ssb-tags')({ postType: 'post' }))
        .call(null, config)
    return sbot
}

module.export = create
```

```js
var test = require('tape')
var createSbot = require('./create-server')

var sbot = createSbot()

test('stuff', function (t) {
    sbot.publish({
        type: 'post',
        text: 'Hello, world! #my-tag ok #tag-again'
    }, function (err, msg) {
        console.log('key', msg.key)
        if (err) throw err
        sbot.tags.get(function (err, res) {
            console.log('**get**', err, res)
            t.ok(res['my-tag'])
            t.ok(res['tag-again'], 'should have tags in view')
            t.equal(res['my-tag'][0], msg.key,
                'tags should reference the message')
            sbot.close(() => t.end())
        })
    })
})
```

```
# npm test
**get** null {
  'my-tag': [ '%1u+SvpS/Ns60NdHVOzZQoVXKeHY+vzEwNXZWmjM810g=.sha256' ],
  'tag-again': [ '%1u+SvpS/Ns60NdHVOzZQoVXKeHY+vzEwNXZWmjM810g=.sha256' ]
}
```

## test
```
npm test
```

