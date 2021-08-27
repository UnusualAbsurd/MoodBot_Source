const { model, Schema } = require('mongoose')

let data = new Schema({
    role: String,
    user: String,
    guild: String,
})

module.exports = model('muted-users', data);