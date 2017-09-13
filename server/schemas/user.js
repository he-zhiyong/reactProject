/**
 * 用户信息
 */
var mongoose = require('../lib/mongo'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        index: true
    }, 
    password: {
        type: String
    }, 
});

module.exports = mongoose.model('User', UserSchema);