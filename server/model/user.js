// const mongoose = require('mongoose');
// const validator = require('validator');
// var User = new mongoose.Schema({
//    email:{
//     type:String,
//     required:true,
//     unique:true,
//     lowercase: true,
//     validate: {
//       validator: function (value) {
//         return validator.isEmail(value);
//       },
//       message: 'Invalid email address',
//     },
//    },
//    password:{
//     type:String,
//     required:true,
//     minlength: 4,
//    }
// },
// {collection:'Userdbs'})

// const Userdb=mongoose.model('Userdb',User)
// module.exports = Userdb;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that email is unique
    trim: true, // Trims whitespace from the email
    lowercase: true // Converts email to lowercase
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the User model
const Userdb = mongoose.model('User', userSchema);

module.exports = Userdb;
