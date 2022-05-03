const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const musicsSchema = new Schema ({
   _id : {
      type: ObjectId
   },
   name: {
      type: String
   },
   href: {
      type: String
   }
},  { _id: false }, 
{timestamps: true})

module.exports = mongoose.model("Musics", musicsSchema);