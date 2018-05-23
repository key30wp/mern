
// server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// var User = require('./../models/User');

router.get('/', function(req, res){
  res.render('index')
});

// router.route('/user/insert')
// .post(function(req,res) {
//  var user = new User();
//  user.name = req.body.name;
//   user.lastname = req.body.lastname;
//   user.email = req.body.email;
//   user.password = req.body.password;
//   // console.log('USER', user);
//   user.save(function(err) {
//       if (err){
//         res.send(err);}
//       res.send('User successfully added!');
//   });
// })

// router.route('/update')
// .post(function(req, res) {
//  const doc = {
//      name: req.body.name,
//      lastname: req.body.lastname,
//      email: req.body.email,
//      password: req.body.password
//  };
//  console.log(doc);
//   User.update({_id: req.body._id}, doc, function(err, result) {
//       if (err)
//         res.send(err);
//       res.send('User successfully updated!');
//   });
// });

// router.get('/delete', function(req, res){
//  var id = req.query.id;
//  User.find({_id: id}).remove().exec(function(err, User) {
//   if(err)
//    res.send(err)
//   res.send('User successfully deleted!');
//  })
// });

// router.get('/getAll',function(req, res) {
//  User.find({},function(err, users) {
//     if (err)
//      res.send(err);
//     res.send(users);
//    });
// });

module.exports = router;