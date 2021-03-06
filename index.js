// require('dotenv').config();
var express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
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
var search =require('./controllers/search.controller')

Mongoose.connect("mongodb://localhost/project2",{ 
  useUnifiedTopology: true,
  useNewUrlParser: true    });
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken')
var port = 3000;
// var app = express();
server.listen(port);
app.use(cookieParser())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
var useronline = []
const channels = {};
const sockets = {};
io.on('connection', socket => {
  console.log(socket.id + ': connected');
  socket.channels = {};
  sockets[socket.id] = socket;
  socket.on("connectto",(data)=>{
    var {userid, username}= data;
    socket.join(data.userid);
    var isconnect= false
    useronline.forEach(element => {
      if(element.userid===data.userid){
        console.log('da connect');
        isconnect= true;
      }
    });
    if(!isconnect){

      
      useronline.push({userid: userid, username: username, socketid: socket.id})
      console.log( `userid is ${data.userid} connected`)
    }
  })
  socket.on("useronline",()=>{
    // console.log('on useronline')
    // console.log(useronline)
    io.emit("useronline",useronline)
  })
  socket.on('message', (data)=>{
    console.log(data.receiver)
    io.to(data.receiver[0]._id).to(data.receiver[1]._id).emit('message', data)

    // io.to(data.member[1]).emit('message', {
    //   username: data.member[0],
    //   content: data.content
    // })
    // socket.emit('message',{
    //   username: data.member[0],
    //   content: data.content
    // })
  })
  socket.on('call',data=>{
    console.log(data.receiver);
    io.to(data.receiver).emit('call',data);
  })

  socket.on('join', (config) => {
    // console.log("[" + socket.id + "] join ", config);
    const channel = config.channel;
    // const userdata = config.userdata;

    if (channel in socket.channels) {
        // console.log("[" + socket.id + "] ERROR: already joined ", channel);
        return;
    }

    if (!(channel in channels)) {
        channels[channel] = {};
    }

    for (id in channels[channel]) {
        channels[channel][id].emit('addPeer', {'peer_id': socket.id, 'should_create_offer': false});
        socket.emit('addPeer', {'peer_id': id, 'should_create_offer': true});
    }

    channels[channel][socket.id] = socket;
    socket.channels[channel] = channel;
});

const part = (channel) => {
    // console.log("[" + socket.id + "] part ");

    if (!(channel in socket.channels)) {
        // console.log("[" + socket.id + "] ERROR: not in ", channel);
        return;
    }

    delete socket.channels[channel];
    delete channels[channel][socket.id];

    for (id in channels[channel]) {
        channels[channel][id].emit('removePeer', {'peer_id': socket.id});
        socket.emit('removePeer', {'peer_id': id});
    }
}
socket.on('part', part);

socket.on('relayICECandidate', (config) => {
    let peer_id = config.peer_id;
    let ice_candidate = config.ice_candidate;
    // console.log("[" + socket.id + "] relaying ICE candidate to [" + peer_id + "] ", ice_candidate);

    if (peer_id in sockets) {
        sockets[peer_id].emit('iceCandidate', {'peer_id': socket.id, 'ice_candidate': ice_candidate});
    }
});

socket.on('relaySessionDescription', (config) => {
    let peer_id = config.peer_id;
    let session_description = config.session_description;
    // console.log("[" + socket.id + "] relaying session description to [" + peer_id + "] ", session_description);

    if (peer_id in sockets) {
        sockets[peer_id].emit('sessionDescription', {
            'peer_id': socket.id,
            'session_description': session_description
        });
    }
});
  socket.on("disconnect", () => {
    for (const channel in socket.channels) {
      part(channel);
    }
    // console.log("[" + socket.id + "] disconnected");
    delete sockets[socket.id];
    for (let index = 0; index < useronline.length; index++) {
      // const element = useronline[index];
      if(useronline){

        if((useronline[index].socketid===socket.id)) {
          // console.log('s');
          useronline.splice(index, 1)
          break;
        }
      }
    }
    // useronline.forEach(element => {
    //   if(element.socketid===socket.id) {
    //     console.log('s');
    //     delete element
    //   }
    // });
    console.log("Client disconnected");
  });
})

app.all('/login', user.login)
app.post('/signup', user.signup)
app.get('/postchat',chat.postchat)
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
app.get(['/room', '/room/:room'], (req, res) => res.sendFile(__dirname + '/client/public/call.html'));

app.get('/', (req, res)=>{
  res.send("ahhahaha")
});
app.get('/search', search.getOne)

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
// Hien thi cac chat cua 1 user
app.get('/chat/:id', chat.getOne)
//lay tat ca tin nhan cua 1 chat
// app.put('/chat/:id', chat.put);

app.post('/chat/:id', chat.post);
//tao 1 phong chat moi voi nhung con nguoi moi
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
app.get('/remove/team/:id', team.remove)
app.post('/member/team', team.newmem)
app.get('/removemem/team/:id', team.removemem)
app.get('/remove/channel/:id', team.removechannel)
app.get('/remove/post/:id', team.removepost)
// // app.delete('/team/:id', team.delete)


// app.listen(port, function() {
//   console.log('Server listening on port ' + port);
// });
