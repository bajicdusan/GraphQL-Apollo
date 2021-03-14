const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: String,
    time: String,
    userId: String,
    text: String
});

module.exports = mongoose.model('Message', messageSchema);