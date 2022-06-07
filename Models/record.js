const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
   recordId: {
      type: Schema.Types.ObjectId,
   },
   Title: {
      type: String
   },
   tag: {
      type: [String]
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
   name: {
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

module.exports = mongoose.model('record', recordSchema);