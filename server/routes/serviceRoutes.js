//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Service = require('./../models/Service');

router.get('/service', function(req, res){
  res.render('service')
});

router.route('/insert')
.post(function(req,res) {
    var service = new Service();
    service.name = req.body.name;
    service.duration = req.body.duration;
    service.description = req.body.description;
    service.enable = req.body.enable;
    service.save(function(err) {
        if (err){
        res.send(err);}
        res.send('Service successfully added!');
    });
})

router.route('/update')
.post(function(req, res) {
 const doc = {
     name: req.body.name,
     description: req.body.description,
     duration: req.body.duration,
     enable: req.body.enable
 };
  Service.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Service successfully updated!');
  });
});

router.get('/delete', function(req, res){
 var id = req.query.id;
 Service.find({_id: id}).remove().exec(function(err, Service) {
  if(err)
   res.send(err)
  res.send('Service successfully deleted!');
 })
});

router.get('/getAll',function(req, res) {
 Service.find({},function(err, services) {
    if (err)
     res.send(err);
    res.send(services);
   });
});

module.exports = router;