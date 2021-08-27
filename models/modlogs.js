const {model, Schema} = require('mongoose')

module.exports = model('mod-logs', new Schema({
    guild: String,
    hook: String,
}))