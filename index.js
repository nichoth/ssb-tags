var codec = require('flumecodec')
var createReduce = require('flumeview-reduce/inject')
var Store = require('flumeview-reduce/store/fs')
var hashtag = require('hashtag')

module.exports = createTagsView

function createTagsView ({ postType }) {
    var tagsPlugin = {
        name: 'tags',
        version:  0,
        manifest: {
            stream: 'source',
            get: 'async'
        },
        init: init
    }

    return tagsPlugin

    function init (sbot) {
        var Reduce = createReduce(Store)

        function reducer (acc, { tags, key }) {
            // make a list of messages that have this tag
            tags.forEach(function (tag) {
                acc[tag] = acc[tag] || []
                acc[tag].push(key)
            })
            return acc
        }
        function mapper (msg) {
            if (msg.value.content.type === postType) {
                var tokens = hashtag.parse(msg.value.content.text || '')
                var tags = tokens.tags
                if (tags.length) return { tags, key: msg.key }
            }
            return null
        }
        var initState = {}

        var reduceView = Reduce(0, reducer, mapper, codec.json, initState)
        var view = sbot._flumeUse('tags', reduceView)
        return view
    }
}

