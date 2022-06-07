const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordNameSchema = new Schema({
   link: {
      type: String,
      required: true
   },
   userId: {
      type: Schema.Types.ObjectId,
   },
   name: {
      type: String
   },
}, {timestamps: true})
const recordName = mongoose.model('record_name', recordNameSchema, "recordName");
module.exports = recordName;