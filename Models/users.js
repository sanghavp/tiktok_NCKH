const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
   userName: {
      type: String,
      unique: true, 
      minlength: 6,
      maxlength: 30 
   }, 
   nickName: {
      type: String
   }, 
   phoneNumber: {
      type: String,
      match: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 
      unique: true,
      required: false
   },
   email: {
      type: String,
      match: /.+\@.+\..+/,
      unique: true,
      required: true
   }, 
   bidthOfdate: {
      type: Date,
      required: true,
      default: Date.now
   },
   password: { 
      type: String, 
      required: true, 
      minlength: 8
   },
   gender: 
   {
      type: Boolean,
      default: true, 
      required: false
   },
   isAdmin: 
   {
      type: Boolean,
      default: false
   }
})

module.exports = mongoose.model("users", UserSchema);