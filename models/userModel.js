const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        reqiured: [true, 'User name area is required'],
        lowercase: true,
        validate: [validator.isAlphanumeric, 'is only alphanumeric']
    },
    email: {
        type: String,
        reqiured: [true, 'Email area is required'],
        unique: true,
        validate: [validator.isEmail, 'Valid e mail is required']
    },
    password: {
        type: String,
        required: [true, 'Password area is required'],
        minLength: [4, 'at least 4 characters']
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],


},
    {
        timestamps: true,
    });

userSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next()
    })
})
const User = mongoose.model('User', userSchema)
module.exports = User