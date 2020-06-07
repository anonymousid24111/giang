// require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
var user =require('./controllers/user.controller')
Mongoose.connect("mongodb://localhost/project2",{ 
  useUnifiedTopology: true,
  useNewUrlParser: true    });
<<<<<<< HEAD
  var cookieParser = require('cookie-parser')
=======
// var controller = require('./controllers/product.controller');
>>>>>>> e4b3aa9a801384c4c815e35aceadcee9530496c7

// var controller = require('./controllers/product.controller');
var jwt = require('jsonwebtoken')
var port = 3000;
var app = express();
app.use(cookieParser())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.all('/login',(req, res)=>{
  console.log(req.body)
  var token = jwt.sign({username: req.body.username}, "key",{ expiresIn: 30})
  res.status(200).send(token)
})
app.all('/private',(req, res)=>{
  if (!req.cookies.username) res.status(400).send('khong co tokent')
  var token = jwt.verify(req.cookies.username, 'key', function(err, decoded){
    if (err) {
      res.status(201).send(err.message)
    }
    else{
      res.status(200).send('ok')
    }
  })
})
// app.get('/studentlist', controller.index);
// app.get('/student/:id/edit', controller.getid);
// app.delete('/student/:id', controller.deleteid);
// app.put('/student/:id/edit', controller.edit);
// app.post('/student/new', controller.create);
// app.post('/login', (req, res)=>{
//   console.log(req.body)
//   res.status(200).json({
//     data: "hihi"
//   })
// })

app.get('/', (req, res)=>{
  res.send("ahhahaha")
});

app.get('/user', user.getAll);
app.put('/user/:id', user.put);
app.post('/user', user.post);
// app.delete('/student/:id', controller.d)

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
