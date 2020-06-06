// require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
Mongoose.connect("mongodb://localhost/project2",{ 
  useUnifiedTopology: true,
  useNewUrlParser: true    });
var controller = require('./controllers/product.controller');

var port = 3000;
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/studentlist', controller.index);
app.get('/student/:id/edit', controller.getid);
app.delete('/student/:id', controller.deleteid);
app.put('/student/:id/edit', controller.edit);
app.post('/student/new', controller.create);
app.post('/login', (req, res)=>{
  console.log(req.body)
  res.status(200).json({
    data: "hihi"
  })
})
// app.delete('/student/:id', controller.d)

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
