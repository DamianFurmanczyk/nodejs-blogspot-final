const mongoose = require("mongoose");
const mongodbErrorHadler = require("mongoose-mongodb-errors");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  date: {
    type: Date,
    required: true
  },
  _user: {
    type: String,
    required: true
  }
});

postSchema.plugin(mongodbErrorHadler);

module.exports = mongoose.model("post", postSchema);
