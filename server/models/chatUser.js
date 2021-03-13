const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatUserSchema = new Schema({
    chatId: String,
    userId: String
});

module.exports = mongoose.model('ChatUsers', chatUserSchema);