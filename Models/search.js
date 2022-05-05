const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const searchSchema = new Schema ({
   key: {
      type: String
   },
   userID: {
      // type: mongoose.SchemaTypes.ObjectId
      type: String
   }
},
{timestamps: true})

module.exports = mongoose.model("SearchKeys", searchSchema);