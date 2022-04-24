const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
   _id: {
      type: ObjectId
   },
   name: {
      type: String
   },
   profile: {
      type: String
   },
   videoCount: {
      type: Number
   }
})

module.exports = mongoose.model("Authors", authorSchema);