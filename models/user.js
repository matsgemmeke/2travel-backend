const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    name: {
        type: String,
        required: [true, 'User real name is required']
    },
    password: {
        type: String,
        required: [true, 'User password is required']
    },
    email: {
        type: String,
        required: [true, 'User email address is required']
    },
    birthday: {
        type: Date,
        required: [true, 'User birthday is required']
    }
});

module.exports = mongoose.model('user', UserSchema);