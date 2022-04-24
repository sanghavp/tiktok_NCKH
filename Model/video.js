const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
   title: {
      type: String
   },
   tag: {
      type: [String]
   },
   music: {
      type: Number
   },
   likeCount: {
      type: String
   },
   
   commentCount: {
      type: String
   },
   shareCount: {
      type: String
   },
   author: {
      type: String
   }
   
}, {timestamp: true})

module.exports = mongoose.model('videos', videoSchema);