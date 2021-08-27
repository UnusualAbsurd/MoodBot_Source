const {model, Schema} = require('mongoose')

let data = new Schema({
    role: String,
    guild: String,
})

module.exports = model('mute-roles', data);