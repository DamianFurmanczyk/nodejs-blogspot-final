const mongoose = require("mongoose");
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHadler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate: validator.isEmail,
    trim: true,
    unique: true
  },
  ispublic: {
    required: true,
    type: String
  },
  dateRegistered: Date,
  blogDescription: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongodbErrorHadler);

module.exports = mongoose.model("user", userSchema);
