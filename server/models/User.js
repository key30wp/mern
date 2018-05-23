//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String
});
module.exports = mongoose.model('User', userSchema);