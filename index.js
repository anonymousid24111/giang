// require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
var user =require('./controllers/user.controller')
Mongoose.connect("mongodb://localhost/project2",{ 
  useUnifiedTopology: true,
  useNewUrlParser: true    });
// var controller = require('./controllers/product.controller');

var port = 3000;
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

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
