//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var serviceSchema = new Schema({
  name: String,
  duration: String,
  description: String,
  enable: Boolean
});
module.exports = mongoose.model('Service', serviceSchema);