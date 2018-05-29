//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Reservation = require('./../models/Reservation');

router.get('/reservation', function(req, res){
  res.render('reservation')
});

router.route('/insert')
.post(function(req,res) {
  var reservation = new Reservation();
  reservation.fullname = req.body.fullname;
  reservation.contact = req.body.contact;
  reservation.email = req.body.email;
  reservation.startDate = req.body.reservationStartDate;
  reservation.endDate = req.body.endDate;
  reservation.serviceId = req.body.service;
  reservation.recommended = req.body.recommended;
  // endDate: Date
  console.log('RESERVATION', reservation, req.body);
  reservation.save(function(err) {
      if (err){
        res.send(err);}
      res.send('Reservation successfully added!');
  });
})

router.route('/update')
.post(function(req, res) {
 const doc = {
     name: req.body.name,
     lastname: req.body.lastname,
     email: req.body.email,
     password: req.body.password
 };
 console.log(doc);
  Reservation.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Reservation successfully updated!');
  });
});

router.get('/delete', function(req, res){
 var id = req.query.id;
 Reservation.find({_id: id}).remove().exec(function(err, Reservation) {
  if(err)
   res.send(err)
  res.send('Reservation successfully deleted!');
 })
});

router.get('/getAll',function(req, res) {
 Reservation.find({},function(err, reservations) {
    if (err)
     res.send(err);
    res.send(reservations);
   });
});

module.exports = router;