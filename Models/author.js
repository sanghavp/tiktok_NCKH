const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
   _id: {
      type: ObjectId
   },
   userName: {
      type: String, 
      unique: true
   },
   nickName: {
      type: String
   },
   link: {
      type: Number
   }
})

module.exports = mongoose.model("Authors", authorSchema);