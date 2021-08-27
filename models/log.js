const {model, Schema} = require('mongoose')

let data = new Schema({
    uri: String,
    token: String,
    id: String,
    guild: String,
})

module.exports = model('logging-events', data);