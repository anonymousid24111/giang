var muser = require('../models/user.model');
var mchat = require('../models/chat.model');
var mmessage = require('../models/message.model');
var mongoose = require('mongoose')
module.exports.getAll = async function(req, res) {
    var data = await muser.findOne({username:req.cookies.username},"chat member").populate({
        path: 'chat',
        // select: 'chat',
        populate: { 
            path: 'message',
            // select: ''
            // populate: {path: 'sender'},
            // populate: {path: 'viewer'},
            // populate: {path: 'react'}
        },
        // populate: { 
        // 	path: 'member',
        // }
      });
    res.status(200).json(data);
};
module.exports.getOne = async function(req, res) {
    var oneUser = await mchat.findById(req.params.id, function(err, docs){
        if (err) {
            res.status(400).json(err)
        }
    }).populate({
        path: 'message'
    })
    res.status(200).json(oneUser)
};
module.exports.put = async function(req, res) {
    var flag = false;
    if (req.body.newUsername != null) {
        const r = await muser.replaceOne({_id: req.params.id}, {username: req.body.newUsername});
        res.status(200).json(r);
        flag = true;
    }
    if (req.body.newPassword != null) {
        await muser.replaceOne({_id: req.params.id}, {password: req.body.newPassword});
        res.status(200).json("ngon");
        flag = true;
    }
    if (req.body.newEmail != null) {
        await muser.replaceOne({_id: req.params.id}, {email: req.body.newEmail});
        res.status(200).json("ngon");
        flag = true;
    }
    if (flag) res.status(400).json("None params");
}
module.exports.post = async function(req, res){
    // console.log(req.body)
    if (!req.body.content) {
        res.status(201).send("content miss")
    }
    else{

        const message =await new mmessage({
            _id: new mongoose.Types.ObjectId(),
            sender: req.cookies.username,
            viewer: [req.cookies.username, req.body.viewer],
            // react: [react3._id, react1._id],
            content: req.body.content
        })
        const chat = await mchat.findByIdAndUpdate(req.params.id,{
            $push:{
                message: message._id
            },
            $set:{
                date: new Date()
            }
        })
        chat.save();
        message.save();
        res.status(200).send('post method chat')
    }
}

