// models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reservationSchema = new Schema({
  fullname: String,
  serviceId: Number,
  contact: String,
  country:String,
  email: String,
  recommended: String,
  startDate: Date,
  endDate: Date,
  note:String
});
module.exports = mongoose.model('Reservation', reservationSchema);