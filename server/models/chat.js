const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    header: String,
});

module.exports = mongoose.model('Chat', chatSchema);