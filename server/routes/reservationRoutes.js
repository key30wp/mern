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
  reservation.save(function(err) {
      if (err){
        res.send(err);}
      // res.send('Reservation successfully added!');
      Reservation.find({},function(err, reservations) {
        if (err)
         res.send(err);
        res.send(reservations);
      });
  });
})

router.route('/update')
.post(function(req, res) {
 const doc = {
  fullname: req.body.fullname,
  contact: req.body.contact,
  email: req.body.email,
  startDate: req.body.reservationStartDate,
  endDate: req.body.endDate,
  serviceId: req.body.service,
  recommended: req.body.recommended
 };
  Reservation.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Reservation successfully updated!');
  });
});

router.get('/delete', function(req, res){
 Reservation.find({_id: req.query.id}).remove().exec(function(err, result) {
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