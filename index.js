// require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
var user =require('./controllers/user.controller')
var activity =require('./controllers/activity.controller')
var assignment =require('./controllers/assignment.controller')
var calendar =require('./controllers/calendar.controller')
var channel =require('./controllers/channel.controller')
var chat =require('./controllers/chat.controller')
var file =require('./controllers/file.controller')
var history =require('./controllers/history.controller')
var message =require('./controllers/message.controller')
var post =require('./controllers/post.controller')
var react =require('./controllers/react.controller')
var team =require('./controllers/team.controller')
Mongoose.connect("mongodb://localhost/project2",{ 
  useUnifiedTopology: true,
  useNewUrlParser: true    });
var cookieParser = require('cookie-parser')
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

app.get('/', (req, res)=>{
  res.send("ahhahaha")
});

app.get('/user', user.getAll);
app.get('/user/:id', user.getOne)
app.put('/user/:id', user.put);
app.post('/user', user.post);
app.delete('/user/:id', user.delete)

app.get('/activity', activity.getAll);
app.get('/activity/:id', activity.getOne)
app.put('/activity/:id', activity.put);
app.post('/activity', activity.post);
app.delete('/activity/:id', activity.delete)

app.get('/assignment', assignment.getAll);
app.get('/assignment/:id', assignment.getOne)
app.put('/assignment/:id', assignment.put);
app.post('/assignment', assignment.post);
app.delete('/assignment/:id', assignment.delete)

app.get('/calendar', calendar.getAll);
app.get('/calendar/:id', calendar.getOne)
app.put('/calendar/:id', calendar.put);
app.post('/calendar', calendar.post);
app.delete('/calendar/:id', calendar .delete)

app.get('/channel', channel.getAll);
app.get('/channel/:id', channel.getOne)
app.put('/channel/:id', channel.put);
app.post('/channel', channel.post);
// // app.delete('/channel/:id', channel.delete)

app.get('/chat', chat.getAll);
app.get('/chat/:id', chat.getOne)
app.put('/chat/:id', chat.put);
app.post('/chat', chat.post);
// // app.delete('/chat/:id', chat.delete)

app.get('/file', file.getAll);
app.get('/file/:id', file.getOne)
app.put('/file/:id', file.put);
app.post('/file', file.post);
// // app.delete('/file/:id', file.delete)

app.get('/history', history.getAll);
app.get('/history/:id', history.getOne)
app.put('/history/:id', history.put);
app.post('/history', history.post);
// // app.delete('/history/:id', history.delete)

app.get('/message', message.getAll);
app.get('/message/:id', message.getOne)
app.put('/message/:id', message.put);
app.post('/message', message.post);
// // app.delete('/message/:id', message.delete)

app.get('/post', post.getAll);
app.get('/post/:id', post.getOne)
app.put('/post/:id', post.put);
app.post('/post', post.post);
// // app.delete('/post/:id', post.delete)

app.get('/react', react.getAll);
app.get('/react/:id', react.getOne)
app.put('/react/:id', react.put);
app.post('/react', react.post);
// // app.delete('/react/:id', react.delete)

app.get('/team', team.getAll);
app.get('/team/:id', team.getOne)
app.put('/team/:id', team.put);
app.post('/team', team.post);
// // app.delete('/team/:id', team.delete)


app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
