var file = require('./file.model')
var user = require('./user.model')
var history = require('./history.model')
var team = require('./team.model')
var channel = require('./channel.model')
var post = require('./post.model')
var react = require('./react.model')
// var reply = require('./reply.model')
var activity = require('./activity.model')
var chat = require('./chat.model')
var message = require('./message.model')
var assignment = require('./assignment.model')
var calendar = require('./calendar.model')

var mongoose = require('mongoose');

async function init(){
await await file.deleteMany({}, function(err) { 
    console.log('file removed') 
 });
const file1 =await new file({
    _id: new mongoose.Types.ObjectId(),
    type: 'jpg',
    filename: 'test jpg',
    link: 'test.jpg',
    datemodified: Date(),
    location: 'somewhere'
    })
    file1.save();
const file2 =await new file({
    _id: new mongoose.Types.ObjectId(),
    type: 'txt',
    filename: 'test txt',
    link: 'test.txt',
    datemodified: Date(),
    location: 'somewhere'
    })
    file2.save();
const file3 =await new file({
    _id: new mongoose.Types.ObjectId(),
    type: 'docx',
    filename: 'test docx',
    link: 'test.docx',
    datemodified: Date(),
    location: 'somewhere'
    })
    file3.save();

await user.deleteMany({}, function(err) { 
    console.log('user removed') 
    });
const user1 =await new user({
    _id: new mongoose.Types.ObjectId(),
    username: "username1",
    avatar: "username1.jpg",
    sex: "male",
    email: "username1@gmail.com",
    birthday: Date(),
    password: "password"
    })
    user1.save();
const user2 =await new user({
    _id: new mongoose.Types.ObjectId(),
    username: "username2",
    avatar: "username2.jpg",
    sex: "male",
    email: "username2@gmail.com",
    birthday: Date(),
    password: "password"
    })
    user2.save();
const user3 =await new user({
    _id: new mongoose.Types.ObjectId(),
    username: "username3",
    avatar: "username3.jpg",
    sex: "male",
    email: "username3@gmail.com",
    birthday: Date(),
    password: "password"
    })
    user3.save();

await history.deleteMany({}, function(err) { 
    console.log('history removed') 
 });
const history1 =await new history({
	connecter: user1._id,
	date: Date(),
	status: "incoming"
})
history1.save();
const history2 =await new history({
	connecter: user2._id,
	date: Date(),
	status: "missing"
})
history2.save();
const history3 =await new history({
	connecter: user3._id,
	date: Date(),
	status: "incoming"
})
history3.save();

await team.deleteMany({}, function(err) { 
    console.log('team removed') 
 });
const team1 =await new team({
    _id: new mongoose.Types.ObjectId(),
	teamname: "team1",
	avatar: "team1.jpg",
	admin:  user1._id,
	member: [user2._id, user3._id],
	// channel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'channelSchema' }],
	detail: "This is team1. User1 is an admin. User2 and user3 are menbers!"
})
team1.save();
const team2 =await new team({
    _id: new mongoose.Types.ObjectId(),
	teamname: "team2",
	avatar: "team2.jpg",
	admin:  user2._id,
	member: [user1._id, user3._id],
	// channel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'channelSchema' }],
	detail: "This is team2. User2 is an admin. User1 and user3 are menbers!"
})
team2.save();
const team3 =await new team({
    _id: new mongoose.Types.ObjectId(),
	teamname: "team3",
	avatar: "team3.jpg",
	admin:  user3._id,
	member: [user2._id, user1._id],
	// channel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'channelSchema' }],
	detail: "This is team3. User3 is an admin. User2 and user1 are menbers!"
})
team3.save();

await channel.deleteMany({}, function(err) { 
    console.log('channel removed') 
 });
const channel1 =await new channel({
    _id: new mongoose.Types.ObjectId(),
	channelname: "channel1",
	// post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'postSchema' }],
	file: [file1._id, file2._id],
})
channel1.save();
const channel2 =await new channel({
    _id: new mongoose.Types.ObjectId(),
	channelname: "channel2",
	// post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'postSchema' }],
	file: [file2._id, file3._id],
})
channel2.save();
const channel3 =await new channel({
    _id: new mongoose.Types.ObjectId(),
	channelname: "channel3",
	// post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'postSchema' }],
	file: [file3._id, file3._id],
})
channel3.save();

await react.deleteMany({}, function(err){
    console.log("removed")
});
const react1 =await new react({
    _id: new mongoose.Types.ObjectId(),
    sender: user1._id,
    date: Date(),
    reactname: "haha"
})
react1.save();
const react2 =await new react({
    _id: new mongoose.Types.ObjectId(),
    sender: user2._id,
    date: Date(),
    reactname: "sad"
})
react2.save();
const react3 =await new react({
    _id: new mongoose.Types.ObjectId(),
    sender: user3._id,
    date: Date(),
    reactname: "love"
})
react3.save();

await post.deleteMany({}, function(err) { 
    console.log('post removed') 
 });
const post1 =await new post({
    _id: new mongoose.Types.ObjectId(),
    sender: user1._id,
    date: Date(),
    content: "content of post1",
    react: [react2._id, react3._id]
    // reply: [],
})
post1.save();
const post2 =await new post({
    _id: new mongoose.Types.ObjectId(),
    sender: user2._id,
    date: Date(),
    content: "content of post2",
    // react: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reactSchema' }],
    // reply: [{ type: mongoose.Schema.Types.ObjectId, ref: 'replySchema' }],
})
post2.save();
const post3 =await new post({
    _id: new mongoose.Types.ObjectId(),
    sender: user3._id,
    date: Date(),
    content: "content of post3",
    react: [react1._id, react2._id],
    reply: [post1._id, post2._id],
})
post3.save();


await activity.deleteMany({}, function(err){
    console.log("removed")
})
const activity1 =await new activity({
    _id: new mongoose.Types.ObjectId(),
    sender: user2._id,
    date: Date(),
    subject: "user2 reacted to sad for post you upload in ",
    link: "http://localhost:3000/user/post?channel=chanel1&team=team1&postid="+post1._id
})
activity1.save();
const activity2 =await new activity({
    _id: new mongoose.Types.ObjectId(),
    sender: user2._id,
    date: Date(),
    subject: "user3 reacted to love for post you upload in ",
    link: "http://localhost:3000/user/post?channel=chanel2&team=team2&postid="+post2._id
})
activity2.save();
const activity3 =await new activity({
    _id: new mongoose.Types.ObjectId(),
    sender: user2._id,
    date: Date(),
    subject: "user1 reacted to haha for post you upload in ",
    link: "http://localhost:3000/user/post?channel=chanel3&team=team3&postid="+post3._id
})
activity3.save();

await message.deleteMany({}, function(err){
    console.log("removed")
})
const message1 =await new message({
    _id: new mongoose.Types.ObjectId(),
	sender: user1.username,
	viewer: [user2.username],
    react: [react1._id, react2._id],
	content: "content that user1 send to user2"
})
message1.save();
const message2 =await new message({
    _id: new mongoose.Types.ObjectId(),
	sender: user2.username,
	viewer: [user1.username],
    react: [react1._id, react2._id],
	content: "content that user2 send to user1"
})
message2.save();
const message3 =await new message({
    _id: new mongoose.Types.ObjectId(),
	sender: user3.username,
	viewer: [user1.username],
    react: [react3._id, react1._id],
	content: "content that user3 send to user1"
})
message3.save();


await chat.deleteMany({}, function(err){
    console.log("removed")
})
const chat1 =await new chat({
    _id: new mongoose.Types.ObjectId(),
    chatname: user2.username,
    // sender: user1.username,
    member: [user1.username, user2.username],
    date: Date(),
    message:  [message1._id, message2._id]
})
chat1.save();
const chat2 =await new chat({
    _id: new mongoose.Types.ObjectId(),
    chatname: user3.username,
    // sender: user2.username,
    member: [user1.username, user3.username],
    date: Date(),
    message:  [message3._id]
})
chat2.save();

await assignment.deleteMany({}, function(err){
    console.log("removed")
});
const assignment1 =await new assignment({
    _id: new mongoose.Types.ObjectId(),
    sender: team1._id,
    status: "assigned",
    deadline: Date("October 1, 2020 12:00:00"),
    date: Date(),
    title: "assignment1",
	content: "1+1=...?"
})
assignment1.save();
const assignment2 =await new assignment({
    _id: new mongoose.Types.ObjectId(),
    sender: team2._id,
    status: "assigned",
    deadline: Date("October 2, 2020 22:00:00"),
    date: Date(),
    title: "assignment2",
	content: "2+2=...?"
})
assignment2.save();
const assignment3 =await new assignment({
    _id: new mongoose.Types.ObjectId(),
    sender: team3._id,
    status: "assigned",
    deadline: Date("October 3, 2020 12:00:00"),
    date: Date(),
    title: "assignment3",
	content: "3+3=...?"
})
assignment3.save();

await calendar.deleteMany({}, function(err){
    console.log("removed")
})
const calendar1 =await new calendar({
    _id: new mongoose.Types.ObjectId(),
    dateplan: Date("May 13, 2020 12:00:00"),
    sender: team1._id,
  	content: "meeting lesson 1 on channel 1"
})
calendar1.save();
const calendar2 =await new calendar({
    _id: new mongoose.Types.ObjectId(),
    dateplan: Date("May 23, 2020 22:00:00"),
    sender: team2._id,
  	content: "meeting lesson 2 on channel 2"
})
calendar2.save();
const calendar3 =await new calendar({
    _id: new mongoose.Types.ObjectId(),
    dateplan: Date("May 3, 2020 8:00:00"),
    sender: team3._id,
  	content: "meeting lesson 3 on channel 3"
})
calendar3.save();
await user.findByIdAndUpdate(user1._id,{$push:{
    contact: [user2._id],
    history: [history1._id, history2._id],
    team: [team1._id, team2._id, team3._id],
    activity: [activity1._id, activity2._id, activity3._id],
    chat: [chat1._id, chat2._id],
    assignment: [assignment1._id, assignment2._id, assignment3._id],
    calendar: [calendar1._id, calendar2._id, calendar3._id],
    file: [file1._id, file2._id, file3._id]
}})
await user.findByIdAndUpdate(user2._id,{$push:{
    contact: [user1._id],
    // history: [history1._id, history2._id],
    team: [team1._id, team2._id, team3._id],
    // activity: [activity1._id, activity2._id, activity3._id],
    chat: [chat1._id],
    assignment: [assignment1._id, assignment2._id, assignment3._id],
    calendar: [calendar1._id, calendar2._id, calendar3._id],
    file: [file1._id, file2._id, file3._id]
}})
await user.findByIdAndUpdate(user3._id,{$push:{
    contact: [user1._id],
    // history: [history1._id, history2._id],
    team: [team1._id, team2._id, team3._id],
    // activity: [activity1._id, activity2._id, activity3._id],
    chat: [chat2._id],
    assignment: [assignment1._id, assignment2._id, assignment3._id],
    calendar: [calendar1._id, calendar2._id, calendar3._id],
    file: [file1._id, file2._id, file3._id]
}})
}

init();