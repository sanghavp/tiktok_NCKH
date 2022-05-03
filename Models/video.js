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
      type: Number, 
   },
   musicName: {
      type: String
   },
   musicHref: {
      type: String
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
   }, 
   authorNickname: {
      type: String
   },
   authorHref: {
      type: String
   }
}, {timestamps: true})

module.exports = mongoose.model('videos', videoSchema);