//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var serviceSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String
});
module.exports = mongoose.model('Service', serviceSchema);