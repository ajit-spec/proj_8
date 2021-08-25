const mongoose = require('mongoose')
const {Schema} = mongoose;

const userschema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is req'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'email is req'],
      unique: true,
      match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email is not valid!!']
    },
    password: {
      type: String,
      required: [true, 'password is req']
    },
  }
);


const User = mongoose.model('User', userschema);

module.exports = User
