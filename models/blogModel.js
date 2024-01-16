const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
 createdBy: {
  type:String,
  ref:'tekki_users',
  required:true
 },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


const Blog = mongoose.model('tekki_blog', blogSchema);

module.exports = Blog;
